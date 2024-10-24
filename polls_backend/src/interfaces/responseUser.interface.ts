import { MessageInterface } from './message.interface';
import { UserInterface } from './user.interface';

export interface ResponseUserInterface {
  message: MessageInterface;
  user: UserInterface | null;
}