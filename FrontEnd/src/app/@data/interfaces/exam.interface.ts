import {QuestionInterface} from '@data/interfaces/question.interface';

export interface ExamInterface  {
  _id: string;
  title: string;
  startDate: number;
  expireAt: number;
  duration: number;
  expired: boolean;
  questions: QuestionInterface[];
}
