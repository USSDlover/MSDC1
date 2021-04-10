import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { ValidatingRequesterService } from './validating-requester.service';
import { AnswerQuestionDto } from '../dtos/answer-question.dto';
import { Exam, ExamDocument } from '../../exam/schemas/exam.schema';
import { Requester, RequesterDocument } from '../schemas/requester.schema';
import { QuestionService } from '../../exam/services/question.service';

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

  async startExam(requesterId: string): Promise<Exam> {
    const requester = await this.requesterModel.findById(requesterId);
    if (requester === null)
      throw new BadRequestException('Requester Not Valid');
    if (this.validator.alreadyTested(requester))
      throw new BadRequestException('Already tried');

    const exam = await this.examModel.findById(requester.exam._id);
    if (exam === null)
      throw new BadRequestException('No exam assigned to this requester');
    if (exam.expired) throw new BadRequestException('Exam expired');
    if (exam.startDate > new Date().getTime()) {
      exam.questions = [];
      return exam;
    }

    requester.startedAt = new Date().getTime();
    requester.score = 0;
    await this.requesterModel.findByIdAndUpdate(requester._id, requester);

    exam.questions = await this.questions.getExamQuestions(exam._id, {
      correct: 0,
    });

    return exam;
  }

  async finishExam(requesterId: string): Promise<Requester> {
    const requester = await this.requesterModel.findById(requesterId);

    const numberOfQuestions: number = await this.questions
      .getExamQuestions(requesterId, {})
      .then((res) => res.length);
    const numberOfCorrectAnswers: number = requester.answers.filter((a) => {
      if (a.isCorrect) return a;
    }).length;

    requester.score = Math.floor(
      (numberOfCorrectAnswers / numberOfQuestions) * 100,
    );
    requester.finishedAt = new Date().getTime();

    return this.requesterModel.findByIdAndUpdate(requester._id, requester);
  }

  async answerQuestion(answer: AnswerQuestionDto): Promise<Requester> {
    const requester = await this.requesterModel.findById(answer.requesterId);
    const question = await this.questions.getQuestion(answer.questionId);

    if (!requester || !question) throw new BadRequestException();

    requester.answers.push({
      questionId: question._id,
      answer: answer.selectedAnswer,
      isCorrect: answer.selectedAnswer === question.correct,
    });

    return this.requesterModel.findByIdAndUpdate(requester._id, requester);
  }
}
