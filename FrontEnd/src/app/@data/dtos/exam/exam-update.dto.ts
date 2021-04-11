import {UpdateQuestionDto} from '../question';

export interface UpdateExamDto {
  _id: string;
  title: string;
  startDate: number;
  expired: boolean;
  expireAt: number;
  duration: number;
  questions: UpdateQuestionDto[];
}
