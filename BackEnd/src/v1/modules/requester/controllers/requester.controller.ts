import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  Scope,
} from '@nestjs/common';

import { RequesterService } from '../services/requester.service';
import { Requester } from '../schemas/requester.schema';
import { CreateRequesterDto } from '../dtos/create-requester.dto';
import { GeneratedRequesterDto } from '../dtos/generated-requester.dto';
import { RequestingService } from '../services/requesting.service';
import { Exam } from '../../exam/schemas/exam.schema';
import { AnswerQuestionDto } from '../dtos/answer-question.dto';

@Controller({
  host: undefined,
  path: 'requester',
  scope: Scope.DEFAULT,
})
export class RequesterController {
  constructor(
    private service: RequesterService,
    private exam: RequestingService,
  ) {}

  @Post()
  async create(
    @Body() requester: CreateRequesterDto,
  ): Promise<GeneratedRequesterDto> {
    return this.service.create(requester);
  }

  @Get()
  async findAll(): Promise<Requester[]> {
    return this.service.findAll();
  }

  @Delete()
  async delete(@Query('id') id: string): Promise<void> {
    return this.service.delete(id);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Requester | null> {
    return this.service.findOne(id);
  }

  @Get('start')
  async start(@Query('id') requesterId: string): Promise<Exam> {
    return this.exam.startExam(requesterId);
  }

  @Get('finish')
  async finish(@Query('id') requesterId: string): Promise<Requester> {
    return this.exam.finishExam(requesterId);
  }

  @Post('answer')
  async answerQuestion(@Body() answer: AnswerQuestionDto): Promise<Requester> {
    return this.exam.answerQuestion(answer);
  }
}
