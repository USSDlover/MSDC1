import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { ValidatingRequesterService } from './validating-requester.service';
// import { AnswerQuestionDto } from '../dtos/answer-question.dto';
import { Exam, ExamDocument } from '../../exam/schemas/exam.schema';
import { Requester, RequesterDocument } from '../schemas/requester.schema';

@Injectable()
export class RequestingService {
  constructor(
    @InjectModel(Requester.name)
    private requesterModel: Model<RequesterDocument>,
    private validator: ValidatingRequesterService,
    @InjectModel(Exam.name)
    private examModel: Model<ExamDocument>,
  ) {}

  async startExam(requesterId: string): Promise<boolean> {
    const requester = await this.requesterModel.findById(requesterId);
    if (requester === null)
      throw new BadRequestException('Requester Not Valid');
    if (this.validator.alreadyTested(requester))
      throw new BadRequestException('Already tried');

    const exam = await this.examModel.findById(requester.exam._id);
    if (exam === null)
      throw new BadRequestException('No exam assigned to this requester');
    if (exam.expired) throw new BadRequestException('Exam expired');

    requester.started = true;
    requester.score = 0;
    await this.requesterModel.findByIdAndUpdate(requester._id, requester);

    return true;
  }

  // async finishExam(requesterId: string): Promise<void> {}

  // async answerQuestion(answer: AnswerQuestionDto): Promise<void> {}
}
