import {Input} from "@/components/ui/input.tsx";
import {Icon} from "@iconify/react";
import {IAnswerCreating} from "@/interfaces/IAnswerCreating.tsx";

interface Props {
  removeAnswer: (index: number) => void;
  updateAnswer: (index: number, answer: IAnswerCreating) => void;
  answer: IAnswerCreating;
  index: number;
}

const CreatingAnswer = (
  {removeAnswer, updateAnswer, answer, index}: Props
) => {

  return <div className="flex justify-between items-center gap-5 mb-5">
    <Input value={answer.answer} placeholder={(index + 1) + " вариант ответа"}
           onChange={(e) => updateAnswer(index, {answer: e.target.value})} />
    <Icon icon="gg:trash" style={{fontSize: "35px"}}
          className="hover:text-red-500 transition cursor-pointer"
          data-testid="remove-answer-icon"
          onClick={() => removeAnswer(index)}
    />
  </div>
};

export default CreatingAnswer;