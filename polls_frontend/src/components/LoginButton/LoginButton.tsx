import pageStore from "@/store/PageStore.ts";
import {EPage} from "@/enums/EPage.ts";
import {Icon} from '@iconify/react';
import {observer} from "mobx-react-lite";

const LoginButton = observer(() => {
  return <button className="flex items-center gap-2 hover:bg-gray-100 transition py-3 px-6 rounded-full"
    onClick={() => pageStore.changePage(EPage.auth)}
    title={pageStore.page === EPage.auth ? "Вы уже здесь" : "Нажмите, чтобы войти в аккаунт"}
  >
    <Icon icon="line-md:login" style={{fontSize: "20px"}}/>
    <div>Войти</div>
  </button>
});

export default LoginButton;