import { UpdateQuestionDto } from './update-question.dto';

export interface UpdateExamDto {
  _id: string;
  title: string;
  startDate: number;
  duration: number;
  questions: UpdateQuestionDto[];
}
