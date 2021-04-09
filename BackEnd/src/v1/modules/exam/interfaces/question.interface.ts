export interface Question {
  title: string;
  answers: {
    1: string;
    2?: string;
    3?: string;
    4?: string;
  };
  correct: number;
}
