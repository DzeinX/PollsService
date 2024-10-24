import {ETab} from "@/enums/ETab.ts";
import {Icon} from "@iconify/react";
import {Dispatch, SetStateAction} from "react";

interface Props {
  tabView: ETab;
  setTabView: Dispatch<SetStateAction<ETab>>;
}

const PollsTabView = (
  {tabView, setTabView}: Props
) => {
  return <div className="flex justify-end items-center">
    <button
      className={(tabView === ETab.list ? "bg-gray-100 " : "cursor-pointer ") + "flex items-center gap-2 hover:bg-gray-100 transition px-5 py-3 rounded-tl-full rounded-bl-full border-t-2 border-l-2 border-b-2"}
      onClick={() => setTabView(ETab.list)}
    >
      <Icon icon="formkit:list" style={{fontSize: "25px"}}/>
      <div>Список</div>
    </button>
    <button
      className={(tabView === ETab.scroll ? "bg-gray-100 " : "cursor-pointer ") + "flex items-center gap-2 hover:bg-gray-100 transition px-5 py-3 rounded-tr-full rounded-br-full border-t-2 border-r-2 border-b-2"}
      onClick={() => setTabView(ETab.scroll)}
    >
      <Icon icon="fluent:phone-vertical-scroll-24-regular" style={{fontSize: "25px"}}/>
      <div>Скролл</div>
    </button>
  </div>
};

export default PollsTabView;