import {observer} from "mobx-react-lite";

interface Props {
  disabled: boolean;
}

const UserIsVoteMarker = observer((
  {disabled}: Props
) => {
  if (!disabled) return null;
  return <div className="absolute text-green-500 top-[20px] left-[30px]" title="Голосовать нельзя">Вы уже проголосовали</div>
});

export default UserIsVoteMarker;