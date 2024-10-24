import { PollsEntity } from '../entities/polls.entity';

export interface SsrAnswerInterface {
  id: number;
  answer: string;
  votes: number;
  poll: PollsEntity;
  percentage: number;
}