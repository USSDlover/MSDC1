import { QuestionInterface } from '../../interfaces/question.interface';

export interface ExamCreateDto {
  title: string;
  startDate: number;
  duration: number;
  expired: boolean;
  expireAt: number;
  questions?: QuestionInterface[];
}
