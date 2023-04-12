import { Timestamp } from 'firebase/firestore';

export interface OptionType {
  id: string;
  title: string;
  isAnswer: boolean;
}

export interface QuestionType {
  id: string;
  prompt: string;
  points: number;
  options: OptionType[];
}

export interface QuizType {
  id: string;
  title: string;
  timelimit: number;
  description: string;
  questions: QuestionType[];
  updatedAt?: Timestamp;
  points?: number; // make points property optional
}
