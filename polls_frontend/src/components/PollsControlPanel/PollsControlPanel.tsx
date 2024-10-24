import {ETab} from "@/enums/ETab.ts";
import {Dispatch, SetStateAction} from "react";
import CreatingPoll from "@/components/CreatingPoll/CreatingPoll.tsx";
import PollsTabView from "@/components/PollsTabView/PollsTabView.tsx";
import authStore from "@/store/AuthStore.ts";


interface Props {
  tabView: ETab;
  setTabView: Dispatch<SetStateAction<ETab>>;
}

const PollsControlPanel = (
  {tabView, setTabView}: Props
) => {
  if (!authStore.user?.isAdmin) return null;

  return <div className="flex justify-between items-center mt-[80px]">
    <CreatingPoll/>
    <PollsTabView tabView={tabView} setTabView={setTabView}/>
  </div>
};

export default PollsControlPanel;