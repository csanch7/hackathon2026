import { Id } from '@/convex/_generated/dataModel';

export type QuizQuestion = {
  _id: Id<'questions'>;
  text: string;
  type: 'likert' | 'yes_no' | 'open_ended';
  category: 'big_five' | 'moral' | 'personal';
  trait?: string;
  orderNum: number;
};

export type QuizAnswerInput = {
  questionId: Id<'questions'>;
  answerLikert?: number;
  answerBool?: boolean;
  answerText?: string;
};

export type QuestionComponentProps = {
  question: QuizQuestion;
  answer?: QuizAnswerInput;
  onAnswerChange: (next: QuizAnswerInput) => void;
};
