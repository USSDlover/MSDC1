import { Exam } from '../../exam/schemas/exam.schema';

export interface GeneratedRequesterDto {
  _id?: string;
  exam: Exam;
  score: number;
}
