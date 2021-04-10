import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Query,
  Scope,
} from '@nestjs/common';
import { Exam } from '../schemas/exam.schema';
import { ExamService } from '../services/exam.service';
import { CreateExamDto } from '../dtos/create-exam.dto';
import { UpdateExamDto } from '../dtos/update-exam.dto';
import { CreateQuestionDto } from '../dtos/create-question.dto';
import { Question } from '../schemas/question.schema';
import { UpdateQuestionDto } from '../dtos/update-question.dto';

@Controller({
  host: undefined,
  path: 'exam',
  scope: Scope.REQUEST,
})
export class ExamController {
  constructor(private service: ExamService) {}

  // region <Exam>

  @Get()
  async findAll(): Promise<Exam[]> {
    return this.service.findAll();
  }

  @Post()
  async create(@Body() exam: CreateExamDto): Promise<Exam> {
    return this.service.create(exam);
  }

  @Put()
  async update(@Body() changes: UpdateExamDto): Promise<Exam> {
    return this.service.update(changes);
  }

  @Delete()
  async delete(@Query('id') examId: string): Promise<Exam> {
    return this.service.deleteExam(examId);
  }

  // endregion

  // region <Question>

  @Get('question')
  async getExamQuestions(@Query('id') examId: string): Promise<Question[]> {
    return this.service.getExamQuestions(examId);
  }

  @Post('question')
  async addQuestion(@Body() addedQ: CreateQuestionDto): Promise<Question> {
    return this.service.addQuestion(addedQ);
  }

  @Put('question')
  async updateQuestion(@Body() changes: UpdateQuestionDto): Promise<Question> {
    return this.service.updateQuestion(changes);
  }

  @Delete('question')
  async deleteQuestion(@Query('id') questionId: string): Promise<Question> {
    return this.service.deleteQuestion(questionId);
  }

  // endregion
}
