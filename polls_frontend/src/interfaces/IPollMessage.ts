import {EPollError} from "@/enums/EPollError.ts";

export interface IPollMessage {
  error: EPollError;
  message: string;
}