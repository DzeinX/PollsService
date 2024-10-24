import {IPoll} from "@/interfaces/IPoll.ts";
import {IAnswer} from "@/interfaces/IAnswer.ts";

export const deepEqual = (pollOld: IPoll[] | IAnswer[], pollNew: IPoll[] | IAnswer[]): boolean => {
  return JSON.stringify(pollOld)===JSON.stringify(pollNew);
}