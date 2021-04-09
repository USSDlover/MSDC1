import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Requester, RequesterDocument } from '../schemas/requester.schema';
import { CreateRequesterDto } from '../dtos/create-requester.dto';
import { GeneratedRequesterDto } from '../dtos/generated-requester.dto';

@Injectable()
export class RequesterService {
  constructor(
    @InjectModel(Requester.name)
    private requesterModel: Model<RequesterDocument>,
  ) {}

  async create(
    createRequester: CreateRequesterDto,
  ): Promise<GeneratedRequesterDto> {
    const createdRequester = new this.requesterModel(createRequester);
    return createdRequester.save();
  }

  async findAll(): Promise<Requester[]> {
    return this.requesterModel.find().exec();
  }
}
