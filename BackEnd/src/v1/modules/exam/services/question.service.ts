import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Question, QuestionDocument } from '../schemas/question.schema';
import { Model } from 'mongoose';
import { CreateQuestionDto } from '../dtos/create-question.dto';
import { UpdateQuestionDto } from '../dtos/update-question.dto';

@Injectable()
export class QuestionService {
  constructor(
    @InjectModel(Question.name)
    private questionModel: Model<QuestionDocument>,
  ) {}

  async create(createQuestion: CreateQuestionDto): Promise<Question> {
    return new this.questionModel(createQuestion)
      .save()
      .catch((e) => e.message);
  }

  async updateQuestion(updatedQuestion: UpdateQuestionDto): Promise<Question> {
    return this.questionModel.findByIdAndUpdate(updatedQuestion).exec();
  }

  async deleteQuestion(questionId: string): Promise<Question> {
    return this.questionModel.findByIdAndDelete(questionId).exec();
  }

  async getExamQuestions(
    examId: string,
    additionalFilters: any,
  ): Promise<Question[]> {
    const projection = { __v: 0 };

    return this.questionModel
      .find({ exam: examId }, Object.assign(projection, additionalFilters), {})
      .exec();
  }

  async getQuestion(id: string): Promise<Question> {
    return this.questionModel.findById(id);
  }

  async getAll(): Promise<Question[]> {
    return this.questionModel.find().exec();
  }
}
