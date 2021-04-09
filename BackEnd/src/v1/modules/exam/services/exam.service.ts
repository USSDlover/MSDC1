import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Exam, ExamDocument } from '../schemas/exam.schema';
import { Model } from 'mongoose';
import { CreateExamDto } from '../dtos/create-exam.dto';

@Injectable()
export class ExamService {
  constructor(
    @InjectModel(Exam.name)
    private examModel: Model<ExamDocument>,
  ) {}

  async create(createExamDto: CreateExamDto): Promise<Exam> {
    const createdExam = new this.examModel(createExamDto);
    return createdExam.save();
  }

  async findAll(): Promise<Exam[]> {
    return this.examModel.find().exec();
  }
}
