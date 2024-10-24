import pollStore from "@/store/PollStore.ts";
import PollCard from "@/components/PollCard/PollCard.tsx";
import {Dispatch, MutableRefObject, SetStateAction, useEffect} from "react";
import {observer} from "mobx-react-lite";
import {IPoll} from "@/interfaces/IPoll.ts";

interface Props {
  limit: number;
  setLimit: Dispatch<SetStateAction<number>>;
  containerRef: MutableRefObject<HTMLDivElement | null>;
}

const ListPolls = observer((
  {limit, setLimit, containerRef}: Props
) => {

  useEffect(() => {
    const currentContainer = containerRef.current;

    const callback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry: IntersectionObserverEntry) => {
        if (entry.isIntersecting && !pollStore.checkIfLimitIsAll(limit)) setLimit(limit + 1)
      })
    }

    const observer = new IntersectionObserver(callback, {
      rootMargin: '0px 0px 50px 0px',
      threshold: 0,
    })

    if (currentContainer) observer.observe(currentContainer)

    return () => {
      if (currentContainer) observer.unobserve(currentContainer)
    }
  }, [limit, setLimit]);

  if (pollStore.getPolls().length === 0) return <div className="text-center text-lg">Опросов пока что нет...</div>;

  return <>
    {pollStore.getPolls().map((poll: IPoll) => <PollCard key={poll.id} poll={poll}/>)}
  </>
});

export default ListPolls;