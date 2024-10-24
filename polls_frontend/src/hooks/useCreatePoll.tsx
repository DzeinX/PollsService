import {useState} from "react";
import {IAnswerCreating} from "@/interfaces/IAnswerCreating.tsx";

export function useCreatePoll() {
  const [listAnswers, setListAnswers] = useState<IAnswerCreating[]>([{answer: ""}]);

  const addAnswer = () => {
    setListAnswers([...listAnswers, {answer: ""}]);
  }

  const removeAnswer = (index: number) => {
    setListAnswers(listAnswers.filter((_, i) => i !== index))
  }

  const updateAnswer = (index: number, answer: IAnswerCreating) => {
    listAnswers[index] = answer;
    setListAnswers([...listAnswers])
  }

  return {listAnswers, addAnswer, removeAnswer, updateAnswer};
}