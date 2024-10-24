import {EUserError} from "@/enums/EUserError.ts";
import {IError} from "@/interfaces/IError.ts";
import {EPollError} from "@/enums/EPollError.ts";

interface Props {
  error: IError;
  equalError: EUserError | EPollError;
  className?: string;
}

const ErrorMessage = (
  {error, equalError, className}: Props
) => {
  return <div role='alert' className={(className ?? "")}>
    {error.error === equalError ? <div>{error.message}</div> : null}
  </div>
};

export default ErrorMessage;