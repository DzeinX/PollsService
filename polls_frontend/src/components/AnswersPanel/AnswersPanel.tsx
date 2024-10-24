import {Icon} from "@iconify/react";

interface Props {
  addAnswer: () => void;
}

const AnswersPanel = (
  {addAnswer}: Props
) => {
  return <div className="flex justify-between items-center">
    <div className="text-lg">Варианты ответов</div>
    <button type="button" className="p-1 rounded-full hover:bg-gray-100 cursor-pointer transition"
            onClick={(): boolean => {addAnswer(); return false;}}>
      <Icon icon="majesticons:plus" style={{fontSize: "25px"}}/>
    </button>
  </div>
};

export default AnswersPanel;