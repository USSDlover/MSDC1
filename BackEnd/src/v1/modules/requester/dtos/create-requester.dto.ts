import { Exam } from '../../exam/schemas/exam.schema';

export interface CreateRequesterDto {
  exam: Exam;
  score?: number;
}
