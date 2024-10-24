import {EPage} from "@/enums/EPage.ts";
import {makeAutoObservable} from "mobx"

class PageStore {
  page: EPage = EPage.auth;

  constructor() {
    makeAutoObservable(this);
  }

  changePage(page: EPage): void {
    this.page = page;
  }
}

export default new PageStore();