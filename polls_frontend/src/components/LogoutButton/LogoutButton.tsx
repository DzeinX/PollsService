import {Icon} from '@iconify/react';
import authStore from "@/store/AuthStore.ts";
import pageStore from "@/store/PageStore.ts";
import {EPage} from "@/enums/EPage.ts";

const LogoutButton = () => {
  return <button className="flex items-center gap-2 hover:bg-gray-100 transition py-3 px-6 rounded-full"
                 onClick={() => {
                   authStore.logout()
                   pageStore.changePage(EPage.auth)
                 }}
                 title="Нажмите, чтобы выйти из аккаунта"
  >
    <Icon icon="line-md:logout" style={{fontSize: "20px"}}/>
    <div>Выйти</div>
  </button>
};
export default LogoutButton;