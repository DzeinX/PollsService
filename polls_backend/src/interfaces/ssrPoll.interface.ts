import { SsrAnswerInterface } from './ssrAnswer.interface';

export interface SsrPollInterface {
  id: number;
  title: string;
  comment: string;
  dateCreated: Date;
  conclusion: number;
  answers: SsrAnswerInterface[];
}