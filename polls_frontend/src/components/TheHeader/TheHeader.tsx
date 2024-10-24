import authStore from "../../../src/store/AuthStore";
import { observer } from "mobx-react-lite";
import pageStore from "@/store/PageStore.ts";
import {EPage} from "@/enums/EPage.ts";
import LoginButton from "@/components/LoginButton/LoginButton.tsx";
import LogoutButton from "@/components/LogoutButton/LogoutButton.tsx";


const TheHeader = observer(() => {
  return <header className="text-xl mt-5 py-3 border-2 border-gray-200 rounded-full">
    <div className="flex justify-between items-center px-3">
      <button onClick={() => pageStore.changePage(EPage.polls)}
              className="ml-6 font-semibold cursor-pointer"
              title={pageStore.page === EPage.polls ? "Вы уже здесь" : "К опросам"}
      >
        SnapPoll
      </button>
      {
        authStore.isAuth()
          ? <LogoutButton/>
          : <LoginButton/>
      }
    </div>
  </header>
});

export default TheHeader;