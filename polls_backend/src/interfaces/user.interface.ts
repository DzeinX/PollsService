import { AnswersEntity } from '../entities/answers.entity';

export interface UserInterface {
  id: number;
  username: string;
  isAdmin: boolean;
  answers: AnswersEntity[];
}