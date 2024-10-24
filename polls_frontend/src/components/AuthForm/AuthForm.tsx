import ErrorMessage from "@/components/ErrorMessage/ErrorMessage.tsx";
import {EUserError} from "@/enums/EUserError.ts";
import {Input} from "@/components/ui/input.tsx";
import {FormEvent, useEffect, useState} from "react";
import authStore from "@/store/AuthStore.ts";
import pageStore from "@/store/PageStore.ts";
import {EPage} from "@/enums/EPage.ts";
import {IUserMessage} from "@/interfaces/IUserMessage.ts";
import {validateUserFields} from "@/utils/validateUserFields.ts";
import FormSubmitButton from "@/components/FormSubmitButton/FormSubmitButton.tsx";

const AuthForm = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<IUserMessage>({error: EUserError.success, message: ""});
  const [pending, setPending] = useState<boolean>(false);

  useEffect(() => {
    if (authStore.authenticateFromSession()) {
      pageStore.changePage(EPage.polls);
    }
  }, [])

  const submitAuth = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setPending(true);

    if (!validateUserFields({username, password, setError})) {
      setPending(false);
      return;
    }

    if (await authStore.authenticate(username, password)) {
      pageStore.changePage(EPage.polls)
    } else {
      setError({error: EUserError.errorValidate, message: "Не правильный логин или пароль"});
      setPending(false);
      return;
    }

    setPending(false);
  }

  return <form onSubmit={(e) => submitAuth(e)} className="flex items-center gap-5 flex-col">
    <ErrorMessage error={error} equalError={EUserError.errorValidate} className="h-[20px] text-yellow-500"/>

    <div className="w-full">
      <Input value={username}
             onChange={(e) => setUsername(e.target.value)}
             placeholder="Имя пользователя"
             className={(error.error === EUserError.errorUsername) ? "border-red-500" : ""}
      />
      <ErrorMessage error={error} equalError={EUserError.errorUsername} className="h-[10px] text-red-500 text-xs"/>
    </div>

    <div className="w-full">
      <Input value={password}
             onChange={(e) => setPassword(e.target.value)}
             placeholder="Пароль"
             type="password"
             className={(error.error === EUserError.errorPassword) ? "border-red-500" : ""}
      />
      <ErrorMessage error={error} equalError={EUserError.errorPassword} className="h-[10px] text-red-500 text-xs"/>
    </div>

    <FormSubmitButton loading={pending} title="Войти"/>
  </form>
};

export default AuthForm;