import {IAnswerCreating} from "@/interfaces/IAnswerCreating.tsx";

export interface IPollCreating {
  title: string;
  comment: string;
  answers: IAnswerCreating[];
}