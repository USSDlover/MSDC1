import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { ValidatingRequesterService } from './validating-requester.service';
import { AnswerQuestionDto } from '../dtos/answer-question.dto';
import { Exam, ExamDocument } from '../../exam/schemas/exam.schema';
import { Requester, RequesterDocument } from '../schemas/requester.schema';
import { QuestionService } from '../../exam/services/question.service';
import { AnsweringStartedDto } from '../dtos/answering-started.dto';

@Injectable()
export class RequestingService {
  constructor(
    @InjectModel(Requester.name)
    private requesterModel: Model<RequesterDocument>,
    private validator: ValidatingRequesterService,
    @InjectModel(Exam.name)
    private examModel: Model<ExamDocument>,
    private questions: QuestionService,
  ) {}

  async startExam(requesterId: string): Promise<AnsweringStartedDto> {
    const requester = await this.requesterModel
      .findById(requesterId)
      .catch((e) => {
        throw new BadRequestException(e.message);
      });

    if (!requester) throw new BadRequestException('Requester Not Valid');
    if (this.validator.alreadyTested(requester))
      throw new BadRequestException('Already tried');

    if (!requester.exam) throw new BadRequestException('No exam assigned');

    const exam = await this.examModel.findById(requester.exam).catch((e) => {
      throw new BadRequestException(e.message);
    });

    if (exam === null)
      throw new BadRequestException('No exam assigned to this requester');
    if (exam.expired) throw new BadRequestException('Exam expired');
    if (exam.startDate > new Date().getTime()) return { exam, questions: [] };

    requester.startedAt = new Date().getTime();
    requester.score = 0;
    await this.requesterModel
      .findByIdAndUpdate(requester._id, requester)
      .exec();

    return {
      exam,
      questions: await this.questions.getExamQuestions(exam._id, {
        correct: 0,
      }),
    };
  }

  async finishExam(requesterId: string): Promise<Requester> {
    const requester = await this.requesterModel.findById(requesterId);
    if (!requester) throw new BadRequestException('There no one');

    const numberOfQuestions: number = await this.questions
      .getExamQuestions(requester.exam, {})
      .then((res) => res.length);
    const numberOfCorrectAnswers: number = requester.answers.filter((a) => {
      if (a.isCorrect) return a;
    }).length;

    requester.score = (numberOfCorrectAnswers / numberOfQuestions) * 100;
    requester.finishedAt = new Date().getTime();

    await this.requesterModel
      .findByIdAndUpdate(requester._id, requester)
      .exec();

    return requester;
  }

  async answerQuestion(answer: AnswerQuestionDto): Promise<Requester> {
    const requester = await this.requesterModel.findById(answer.requesterId);
    const question = await this.questions.getQuestion(answer.questionId);

    if (!requester || !question)
      throw new BadRequestException('Null requester or question');

    requester.answers.push({
      questionId: question._id,
      answer: answer.selectedAnswer,
      isCorrect: answer.selectedAnswer === question.correct,
    });

    await this.requesterModel
      .findByIdAndUpdate(requester._id, requester)
      .exec();

    return requester;
  }
}
