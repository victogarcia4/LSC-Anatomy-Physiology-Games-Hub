
export enum ExamType {
  EXAM_1 = 'Lecture Exam #1',
  EXAM_2 = 'Lecture Exam #2',
  EXAM_3 = 'Lecture Exam #3',
  EXAM_4 = 'Lecture Exam #4',
}

export interface Game {
  id: string;
  title: string;
  subjects: string[];
  url: string;
  exam: ExamType;
  description?: string;
}

export type Theme = 'light' | 'dark';
