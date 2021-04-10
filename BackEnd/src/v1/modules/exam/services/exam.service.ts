import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Exam, ExamDocument } from '../schemas/exam.schema';
import { CreateExamDto } from '../dtos/create-exam.dto';
import { UpdateExamDto } from '../dtos/update-exam.dto';

@Injectable()
export class ExamService {
  constructor(
    @InjectModel(Exam.name)
    private examModel: Model<ExamDocument>,
  ) {}

  async create(createExamDto: CreateExamDto): Promise<Exam> {
    return new this.examModel(createExamDto).save().catch((e) => e.message);
  }

  async update(updatedExamDto: UpdateExamDto): Promise<Exam> {
    return this.examModel
      .findByIdAndUpdate(updatedExamDto._id, updatedExamDto)
      .exec();
  }

  // async deleteQuestion(): void {}

  async findAll(): Promise<Exam[]> {
    return this.examModel.find().exec();
  }
}
