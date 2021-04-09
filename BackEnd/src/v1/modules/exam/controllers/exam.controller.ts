import { Body, Controller, Get, Post, Scope } from '@nestjs/common';
import { Exam } from '../schemas/exam.schema';
import { ExamService } from '../services/exam.service';
import { CreateExamDto } from '../dtos/create-exam.dto';

@Controller({
  host: undefined,
  path: 'exam',
  scope: Scope.DEFAULT,
})
export class ExamController {
  constructor(private service: ExamService) {}

  @Post()
  async create(@Body() exam: CreateExamDto): Promise<Exam> {
    return this.service.create(exam);
  }

  @Get()
  async findAll(): Promise<Exam[]> {
    return this.service.findAll();
  }
}
