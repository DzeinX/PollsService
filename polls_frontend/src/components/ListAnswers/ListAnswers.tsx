import PollAnswer from "@/components/PollAnswer/PollAnswer.tsx";
import {IAnswer} from "@/interfaces/IAnswer.ts";
import {observer} from "mobx-react-lite";
import authStore from "@/store/AuthStore.ts";
import {IPoll} from "@/interfaces/IPoll.ts";

interface Props {
  poll: IPoll;
  doVote: (answerId: number) => Promise<void>;
  disabled: boolean
}

const ListAnswers = observer((
  {poll, doVote, disabled}: Props
) => {

  if (poll.answers.length === 0) return <div className="text-center text-lg">Упс... Кажется, у этого опроса нет
    вариантов ответа :(</div>;

  return <>{poll.answers.map((answer: IAnswer) => {
    return <PollAnswer key={answer.id + "-poll-answer"}
                       answer={answer}
                       doVote={doVote}
                       disabled={disabled}
                       votingRatio={poll.amountVotes > 0 ? (answer.votes / poll.amountVotes) : 0}
                       isUserVote={authStore.getAnswersIds().includes(answer.id)}/>
  })}
  </>
});

export default ListAnswers;