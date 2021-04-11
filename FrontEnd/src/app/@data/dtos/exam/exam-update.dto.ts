import {UpdateQuestionDto} from '../question';

export interface ExamUpdateDto {
  _id: string;
  title: string;
  duration: number;
  startDate: number;
  expireAt: number;
  expired: boolean;
  questions?: UpdateQuestionDto[];
}
