import { MessageInterface } from './message.interface';
import { PollsEntity } from '../entities/polls.entity';

export interface ResponsePollsEntityInterface {
  message: MessageInterface;
  polls: PollsEntity[];
}