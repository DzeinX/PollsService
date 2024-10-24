import pageStore from "@/store/PageStore.ts";
import {EPage} from "@/enums/EPage.ts";
import AuthPage from "@/pages/AuthPage.tsx";
import PollsPage from "@/pages/PollsPage.tsx";
import ErrorPage from "@/pages/ErrorPage.tsx";
import { observer } from "mobx-react-lite"


const TheMain = observer(() => {
  switch (pageStore.page) {
    case EPage.auth:
      return <AuthPage/>;
    case EPage.polls:
      return <PollsPage/>;
    default:
      return <ErrorPage/>;
  }
});

export default TheMain;