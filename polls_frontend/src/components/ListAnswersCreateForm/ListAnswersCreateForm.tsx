import CreatingAnswer from "@/components/CreatingAnswer/CreatingAnswer.tsx";
import {IAnswerCreating} from "@/interfaces/IAnswerCreating.tsx";

interface Props {
  listAnswers: IAnswerCreating[];
  removeAnswer: (index: number) => void;
  updateAnswer: (index: number, answer: IAnswerCreating) => void;
}

const ListAnswersCreateForm = (
  {listAnswers, updateAnswer, removeAnswer}: Props
) => {
  return <div className="mb-5">
    {listAnswers.map((answer: IAnswerCreating, i: number) => {
      return <CreatingAnswer key={i} removeAnswer={removeAnswer}
                             updateAnswer={updateAnswer} answer={answer} index={i}/>;
    })}
  </div>
};

export default ListAnswersCreateForm;