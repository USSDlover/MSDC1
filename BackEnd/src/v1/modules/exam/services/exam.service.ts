import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Exam, ExamDocument } from '../schemas/exam.schema';
import { CreateExamDto } from '../dtos/create-exam.dto';
import { UpdateExamDto } from '../dtos/update-exam.dto';
import { QuestionService } from './question.service';
import { CreateQuestionDto } from '../dtos/create-question.dto';
import { Question } from '../schemas/question.schema';
import { UpdateQuestionDto } from '../dtos/update-question.dto';

@Injectable()
export class ExamService {
  constructor(
    @InjectModel(Exam.name)
    private examModel: Model<ExamDocument>,
    private questions: QuestionService,
  ) {}

  // region <Exam>

  async create(createExamDto: CreateExamDto): Promise<Exam> {
    return new this.examModel(createExamDto)
      .save()
      .then(async (res) => {
        if (createExamDto.questions?.length > 0) {
          for (const q of createExamDto.questions) {
            q.exam = res._id;
            const createdQ = await this.questions.create(q);
            q._id = createdQ._id;
          }
        }
        return res;
      })
      .catch((e) => e.message);
  }

  async update(changes: UpdateExamDto): Promise<Exam> {
    // if (changes?.questions.length > 0) {
    //   for (const qId of changes.questions) {
    //     const q = await this.questions.getQuestion(qId);
    //     if (!q._id || !q.exam || !q) {
    //       q.exam = changes._id;
    //       const createdQ = await this.questions.create(q as CreateQuestionDto);
    //       q._id = createdQ._id;
    //     } else {
    //       await this.updateQuestion(q);
    //     }
    //   }
    // }
    return this.examModel.findByIdAndUpdate(changes._id, changes).exec();
  }

  async getExamById(examId: string): Promise<Exam> {
    return this.examModel.findById(examId);
  }

  async expireIt(examId: string): Promise<Exam> {
    const exam = await this.getExamById(examId);
    exam.expired = true;
    return this.update(exam as UpdateExamDto);
  }

  async deleteExam(examId: string): Promise<Exam> {
    return this.examModel
      .findByIdAndDelete(examId)
      .exec()
      .then(async (res) => {
        const questions: Question[] = await this.questions.getExamQuestions(
          examId,
          {},
        );
        for (const q of questions) {
          await this.deleteQuestion(q._id);
        }
        return res;
      });
  }

  async findAll(): Promise<Exam[]> {
    return this.examModel.find({}, { _v: 0 }).exec();
  }

  // endregion

  // region <Question>

  async addQuestion(question: CreateQuestionDto): Promise<Question> {
    return this.questions.create(question);
  }

  async updateQuestion(changes: UpdateQuestionDto): Promise<Question> {
    return this.questions.updateQuestion(changes);
  }

  async deleteQuestion(id: string): Promise<Question> {
    return this.questions.deleteQuestion(id);
  }

  async getExamQuestions(id: string): Promise<Question[]> {
    return this.questions.getExamQuestions(id, {});
  }

  async getAllQuestions(): Promise<Question[]> {
    return this.questions.getAll();
  }

  // endregion
}
