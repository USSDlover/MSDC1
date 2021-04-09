import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CreateRequesterDto } from '../dtos/create-requester.dto';
import { GeneratedRequesterDto } from '../dtos/generated-requester.dto';
import { Requester, RequesterDocument } from '../schemas/requester.schema';
import { Exam, ExamDocument } from '../../exam/schemas/exam.schema';

@Injectable()
export class RequesterService {
  constructor(
    @InjectModel(Requester.name)
    private requesterModel: Model<RequesterDocument>,
    @InjectModel(Exam.name)
    private examModel: Model<ExamDocument>,
  ) {}

  async create(
    createRequester: CreateRequesterDto,
  ): Promise<GeneratedRequesterDto> {
    return new this.requesterModel(createRequester)
      .save()
      .catch((e) => e.message);
  }

  async delete(requesterId: string): Promise<void> {
    await this.requesterModel.findByIdAndDelete(requesterId).exec();
  }

  async findAll(): Promise<Requester[]> {
    return this.requesterModel.find({}, { __v: 0 }).exec();
  }

  async findOne(requesterId: string): Promise<Requester | null> {
    return this.requesterModel.findById(requesterId).exec();
  }
}
