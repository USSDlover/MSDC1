import { Exam } from '../../exam/schemas/exam.schema';
import { Question } from '../../exam/schemas/question.schema';

export interface AnsweringStartedDto {
  exam: Exam;
  questions: Question[];
}
