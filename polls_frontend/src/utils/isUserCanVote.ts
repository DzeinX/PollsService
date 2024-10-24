import {IAnswer} from "@/interfaces/IAnswer.ts";
import authStore from "@/store/AuthStore.ts";

export const isUserCanNotVote = (answers: IAnswer[]): boolean => {
  for (const answer of answers) {
    if (authStore.getAnswersIds().includes(answer.id)) return true;
  }
  return false;
}