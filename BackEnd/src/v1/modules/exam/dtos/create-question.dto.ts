import { Exam } from '../schemas/exam.schema';

export interface CreateQuestionDto {
  title: string;
  answers: {
    1: string;
    2?: string;
    3?: string;
    4?: string;
  };
  correct: number;
  exam: Exam;
}
