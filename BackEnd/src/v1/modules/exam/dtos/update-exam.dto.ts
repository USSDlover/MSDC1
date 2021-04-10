import { UpdateQuestionDto } from './update-question.dto';

export interface UpdateExamDto {
  _id: string;
  title: string;
  startDate: number;
  expired: boolean;
  expireAt: number;
  duration: number;
  questions: UpdateQuestionDto[];
}
