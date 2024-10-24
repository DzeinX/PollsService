import {IPoll} from "@/interfaces/IPoll.ts";
import {makeAutoObservable, runInAction} from "mobx";
import {deepEqual} from "@/store/helpers/PollHelper.ts";
import {IAnswer} from "@/interfaces/IAnswer.ts";
import {isUserCanNotVote} from "@/utils/isUserCanVote.ts";
import axios, {AxiosResponse} from "axios";

export class PollStore {
  polls: IPoll[] = [];
  maxLimit: number = 0;
  currentLimit: number = 0;


  constructor() {
    makeAutoObservable(this);
  }

  getPolls(): IPoll[] {
    return this.polls;
  }

  getMaxLimit(): number {
    return this.maxLimit;
  }

  getCurrentLimit(): number {
    return this.currentLimit;
  }

  setPolls(polls: IPoll[]): void {
    this.polls = polls;
  }

  setMaxLimit(maxLimit: number): void {
    this.maxLimit = maxLimit;
  }

  setCurrentLimit(currentLimit: number): void {
    this.currentLimit = currentLimit;
  }

  fetchPollsByLimit = (limit: number): void => {
    axios.get("http://localhost:3000/api/polls/one?limit=" + limit)
      .then((response: AxiosResponse): void => {
        if (response.data.message.code === "error") return
        response.data.data.data.forEach((item: IPoll): void => {
          item.isVote = isUserCanNotVote(item.answers);

          let amountVotes: number = 0;
          item.answers.forEach((answer: IAnswer): void => {
            amountVotes += answer.votes;
          })
          item.amountVotes = amountVotes;
        })

        // Обновление опросов
        if (!deepEqual(this.polls, response.data.data.data)) {
          runInAction((): void => {
            this.polls = response.data.data.data;
          })
        }

        // Обновление общего количества опросов
        if (this.maxLimit !== response.data.data.meta.totalItems) {
          runInAction((): void => {
            this.maxLimit = response.data.data.meta.totalItems;
          })
        }

        // Обновление текущего количества опросов
        if (this.currentLimit !== limit) {
          runInAction((): void => {
            this.currentLimit = limit;
          })
        }
      })
  }

  checkIfLimitIsAll(limit: number): boolean {
    return limit >= this.maxLimit;
  }
}

export default new PollStore();