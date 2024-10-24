import {EUserError} from "@/enums/EUserError.ts";

export interface IUserMessage {
  error: EUserError;
  message: string;
}