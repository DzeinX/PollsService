import {Card, CardContent, CardDescription, CardHeader} from "@/components/ui/card.tsx";
import {IPoll} from "@/interfaces/IPoll.ts";
import {useState} from "react";
import {observer} from "mobx-react-lite";
import ListAnswers from "@/components/ListAnswers/ListAnswers.tsx";
import CardConclusion from "@/components/CardConclusion/CardConclusion.tsx";
import GreetingMessage from "@/components/GreetingMessage/GreetingMessage.tsx";
import UserIsVoteMarker from "@/components/UserIsVoteMarker/UserIsVoteMarker.tsx";
import axios from "axios";
import authStore from "@/store/AuthStore.ts";
import pollStore from "@/store/PollStore.ts";

interface Props {
  poll: IPoll;
}

const PollCard = observer((
  {poll}: Props
) => {
  const [message, setMessage] = useState<string>("");
  const [disabled, setDisabled] = useState<boolean>(poll.isVote);

  const doVote = async (answerId: number): Promise<void> => {
    setDisabled(true);
    setMessage("...")
    axios.post(`http://localhost:3000/api/polls/${answerId}/vote`, {userId: authStore.getUser()?.id})
      .then((): void => {
        setMessage("Спасибо, что проголосовали!")
        setTimeout((): void => {
          setMessage("");
        }, 4000)
      })
      .catch((): void => {
        setMessage("Произошла ошибка :(");
        setTimeout((): void => {
          setMessage("")
        }, 4000)
      })
    pollStore.fetchPollsByLimit(pollStore.getCurrentLimit())
    authStore.reFetchUserAnswers()
  }

  return <div className="flex justify-center items-center h-[calc(100vh_-_20px_-_80px_-_40px_-_80px)]">
    <div className="relative w-full">
      <Card className="p-5">
        <CardHeader>
          <div>{poll.title}</div>
          <CardDescription>{poll.comment}</CardDescription>
        </CardHeader>
        <CardContent>
          <ListAnswers poll={poll} doVote={doVote} disabled={disabled}/>
          <CardConclusion amountVotes={poll.amountVotes}/>
        </CardContent>
      </Card>
      <GreetingMessage message={message}/>
      <UserIsVoteMarker disabled={disabled}/>
    </div>
  </div>
});

export default PollCard;