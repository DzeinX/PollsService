import {CardFooter} from "@/components/ui/card.tsx";
import {observer} from "mobx-react-lite";

interface Props {
  amountVotes: number;
}

const CardConclusion = observer((
  {amountVotes}: Props
) => {
  if (amountVotes === 0) return <CardFooter className="justify-center">Проголосуйте первым!</CardFooter>;
  return <CardFooter className="justify-end text-gray-400">всего голосов: {amountVotes}</CardFooter>
});

export default CardConclusion;