import {IAnswer} from "@/interfaces/IAnswer.ts";

export interface IPoll {
  id: number;
  title: string;
  dataCreated: Date;
  comment: string;
  answers: IAnswer[];
  isVote: boolean;
  amountVotes: number;
}