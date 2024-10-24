import {IAnswer} from "@/interfaces/IAnswer.ts";
import {observer} from "mobx-react-lite";
import authStore from "@/store/AuthStore.ts";
import pageStore from "@/store/PageStore.ts";
import {EPage} from "@/enums/EPage.ts";
import {round} from "@/utils/round.ts";

interface Props {
  answer: IAnswer;
  doVote: (answerId: number) => void;
  disabled: boolean;
  votingRatio: number;
  isUserVote: boolean;
}

const PollAnswer = observer((
  {answer, doVote, disabled, votingRatio, isUserVote}: Props
) => {
  const checkAuthAndDoVote = () => {
    if (authStore.isAuth()) {
      doVote(answer.id)
    } else {
      pageStore.changePage(EPage.auth)
    }
  }
  return <button disabled={disabled} onClick={() => checkAuthAndDoVote()} title={answer.votes + ""}
                 className={"relative overflow-hidden w-full flex justify-between items-center rounded-full border border-gray-200 py-2 px-6 mb-5 transition " + (disabled ? "" : "hover:bg-gray-100")}
                 style={{cursor: disabled ? "default" : "pointer"}}
  >
    <div className="relative z-20">{answer.answer}</div>
    <div className={"absolute left-0 top-0 z-10 bottom-0 " + (isUserVote ? "bg-gray-300" : "bg-gray-200")}
         style={{width: "calc(100% * " + votingRatio + ")"}}></div>
    <div className="relative z-20 text-gray-400">{round(votingRatio * 100) + '%'}</div>
  </button>
});

export default PollAnswer;