import {QuestionUpdateDto} from '../question';

export interface ExamUpdateDto {
  _id: string;
  title: string;
  duration: number;
  startDate: number;
  expireAt: number;
  expired: boolean;
  questions?: QuestionUpdateDto[];
}
