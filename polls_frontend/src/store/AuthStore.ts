import {makeAutoObservable, runInAction} from "mobx"
import {IAnswer} from "@/interfaces/IAnswer.ts";
import {IAnswerLessUser} from "@/interfaces/IAnswerLessUser.ts";
import axios, {AxiosResponse} from "axios";
import {deepEqual} from "@/store/helpers/PollHelper.ts";
import {IUser} from "@/interfaces/IUser.ts";


class AuthStore {
  user: IAnswerLessUser | null = null
  userAnswers: IAnswer[] | null = null

  constructor() {
    makeAutoObservable(this)
  }

  getUser(): IAnswerLessUser | null {
    return this.user;
  }

  getUserAnswers(): IAnswer[] | null {
    return this.userAnswers;
  }

  setUser(user: IAnswerLessUser): void {
    this.user = user;
  }

  setUserAnswers(userAnswers: IAnswer[]): void {
    this.userAnswers = userAnswers;
  }

  reFetchUserAnswers(): void {
    axios.post("http://localhost:3000/auth/get-answers", {username: this.user?.username})
      .then((response: AxiosResponse): void => {
        if (response.data.message.code === "success") {
          if (!deepEqual(this.userAnswers!, response.data.answers)) {
            runInAction((): void => {
              this.userAnswers = response.data.answers;
            })
          }
        }
      })
  }

  async authenticate(username: string, password: string): Promise<boolean> {
    let result: boolean = false;
    await axios.post("http://localhost:3000/auth/login", {
      username: username,
      password: password,
    }).then((response: AxiosResponse): void => {
      if (response.data.message.code === "success") {
        const {answers, ...userData} = response.data.user as IUser;

        runInAction((): void => {
          this.user = userData;
          this.userAnswers = answers;
        });

        sessionStorage.setItem("user", JSON.stringify(userData));
        sessionStorage.setItem("userAnswers", JSON.stringify(answers));

        result = true;
      }
    })

    return result;
  }

  logout(): void {
    sessionStorage.removeItem("user");
    sessionStorage.removeItem("userAnswers");
    this.user = null;
    this.userAnswers = null;
  }

  isAuth(): boolean {
    return this.user !== null;
  }

  getAnswersIds(): number[] {
    if (!this.userAnswers) {
      const answers: string | null = sessionStorage.getItem("userAnswers");
      if (!answers) return []

      const userAnswers: IAnswer[] = JSON.parse(answers);
      runInAction((): void => {
        this.userAnswers = userAnswers
      })
    }

    return this.userAnswers ? this.userAnswers.map((answer: IAnswer): number => answer.id) : [];
  }

  authenticateFromSession(): boolean {
    const savedUser: string | null = sessionStorage.getItem("user");
    const savedUserAnswers: string | null = sessionStorage.getItem("userAnswers");

    if (!savedUser || ! savedUserAnswers) return false;

    const user: IUser = JSON.parse(savedUser) as IUser
    runInAction((): void => {
      this.user = user;
    })

    const userAnswers: IAnswer[] = JSON.parse(savedUserAnswers) as IAnswer[]
    runInAction((): void => {
      this.userAnswers = userAnswers;
    })

    return true;
  }
}

export default new AuthStore()