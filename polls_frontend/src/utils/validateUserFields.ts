import {EUserError} from "@/enums/EUserError.ts";
import {Dispatch, SetStateAction} from "react";
import {IUserMessage} from "@/interfaces/IUserMessage.ts";

interface Props {
  username: string;
  password: string;
  setError: Dispatch<SetStateAction<IUserMessage>>;
}

export const validateUserFields = (
  {username, password, setError}: Props
): boolean => {
  if (username === "") {
    setError({error: EUserError.errorUsername, message: "Пожалуйста, заполните имя пользователя"});
    return false;
  }

  if (password === "") {
    setError({error: EUserError.errorPassword, message: "Пожалуйста, заполните пароль"});
    return false;
  }

  return true;
}