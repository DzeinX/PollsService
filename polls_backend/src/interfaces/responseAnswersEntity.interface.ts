import { MessageInterface } from './message.interface';
import { AnswersEntity } from '../entities/answers.entity';

export interface ResponseAnswersEntityInterface {
  message: MessageInterface;
  answers: AnswersEntity[];
}