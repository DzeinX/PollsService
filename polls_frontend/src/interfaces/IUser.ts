import {IAnswer} from "@/interfaces/IAnswer.ts";

export interface IUser {
  id: number;
  username: string;
  isAdmin: boolean;
  answers: IAnswer[];
}