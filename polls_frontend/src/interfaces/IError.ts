import {EUserError} from "@/enums/EUserError.ts";
import {EPollError} from "@/enums/EPollError.ts";

export interface IError {
  error: EUserError | EPollError;
  message: string;
}