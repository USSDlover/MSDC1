import { QuestionInterface } from '../interfaces/question.interface';

export interface UpdateExamDto {
  _id: string;
  title: string;
  startDate: number;
  duration: number;
  questions: QuestionInterface[];
}
