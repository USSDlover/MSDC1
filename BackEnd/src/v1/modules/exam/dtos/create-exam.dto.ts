import { Question } from '../interfaces/question.interface';

export interface CreateExamDto {
  title: string;
  startDate: number;
  duration: number;
  questions: Question[];
}
