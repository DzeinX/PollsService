import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog.tsx";
import FormCreatingPoll from "@/components/FormCreatingPoll/FormCreatingPoll.tsx";
import {Icon} from "@iconify/react";

const CreatingPoll = () => {
  return <Dialog>
    <DialogTrigger>
      <div className="cursor-pointer flex items-center gap-2 hover:bg-gray-100 transition px-5 py-3 rounded-full">
        <Icon icon="majesticons:plus" style={{fontSize: "25px"}}/>
        <div>Создать опрос</div>
      </div>
    </DialogTrigger>
    <DialogContent aria-describedby={undefined}>
      <DialogHeader>
        <DialogTitle className="mb-7">Создание опроса</DialogTitle>
      </DialogHeader>
      <FormCreatingPoll/>
    </DialogContent>
  </Dialog>
};

export default CreatingPoll;