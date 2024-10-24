import pollStore from "@/store/PollStore.ts";
import {useEffect, useRef, useState} from "react";
import {observer} from "mobx-react-lite";
import PollsControlPanel from "@/components/PollsControlPanel/PollsControlPanel.tsx";
import {ETab} from "@/enums/ETab.ts";
import SsrListPolls from "@/components/SsrListPolls/SsrListPolls.tsx";
import authStore from "@/store/AuthStore.ts";
import ListPolls from "@/components/ListPolls/ListPolls.tsx";


const PollsPage = observer(() => {
  const [tabView, setTabView] = useState<ETab>(authStore.user?.isAdmin ? ETab.list : ETab.scroll);
  const [limit, setLimit] = useState<number>(2);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    pollStore.fetchPollsByLimit(limit);
    authStore.reFetchUserAnswers()

    const timer = setInterval(() => {
      pollStore.fetchPollsByLimit(limit)
      authStore.reFetchUserAnswers()
    }, 5000)

    return () => {
      clearInterval(timer)
    }
  }, [limit]);

  return <div className="show">
    <PollsControlPanel tabView={tabView} setTabView={setTabView}/>
    <div className="show">
      {tabView === ETab.scroll ? <ListPolls containerRef={containerRef} limit={limit} setLimit={setLimit}/> : <SsrListPolls/>}
      <div ref={containerRef} className="h-[10px]"></div>
    </div>
  </div>
});

export default PollsPage;