import {ChangeEvent, FormEvent, useState} from "react";
import {useCreatePoll} from "@/hooks/useCreatePoll.tsx";
import {IPollCreating} from "@/interfaces/IPollCreating.ts";
import axios, {AxiosResponse} from "axios";
import ListAnswersCreateForm from "@/components/ListAnswersCreateForm/ListAnswersCreateForm.tsx";
import AnswersPanel from "@/components/AnswersPanel/AnswersPanel.tsx";
import {Input} from "@/components/ui/input.tsx";
import {IPollMessage} from "@/interfaces/IPollMessage.ts";
import {EPollError} from "@/enums/EPollError.ts";
import ErrorMessage from "@/components/ErrorMessage/ErrorMessage.tsx";
import FormSubmitButton from "@/components/FormSubmitButton/FormSubmitButton.tsx";

const FormCreatingPoll = () => {
  const [titleInput, setTitleInput] = useState<string>("");
  const [commentInput, setCommentInput] = useState<string>("");
  const {listAnswers, addAnswer, removeAnswer, updateAnswer} = useCreatePoll()
  const [message, setMessage] = useState<IPollMessage>({message: "", error: EPollError.success});
  const [loading, setLoading] = useState<boolean>(false);

  const doCreatePoll = (event: FormEvent<HTMLFormElement>): void => {
    setLoading(true);

    if (titleInput.trim() === "") {
      event.preventDefault()
      setMessage({error: EPollError.errorTitle, message: "Пожалуйста, напишите вопрос"})
      setLoading(false);
      return;
    }

    if (listAnswers.length === 0) {
      event.preventDefault()
      setMessage({error: EPollError.errorAnswers, message: "Добавьте хотя бы один ответ на вопрос"})
      setLoading(false);
      return;
    }

    for (const answer of listAnswers) {
      if (answer.answer.trim() === "") {
        event.preventDefault()
        setMessage({error: EPollError.errorAnswers, message: "Ответ не может быть пустым"})
        setLoading(false);
        return;
      }
    }

    const poll: IPollCreating = {title: titleInput, comment: commentInput, answers: listAnswers};
    axios.post("http://localhost:3000/api/polls", poll)
      .then((response: AxiosResponse): void => {
        if (response.data.message === "error") {
          setMessage({error: EPollError.errorSaving, message: "Произошла ошибка при сохранении опроса"})
        }
      })

    setLoading(false);
  }

  return <form onSubmit={(event: FormEvent<HTMLFormElement>): void => doCreatePoll(event)}>
    <div className="mb-5">
      <Input placeholder="Вопрос" value={titleInput}
             onChange={(e: ChangeEvent<HTMLInputElement>): void => setTitleInput(e.target.value)}/>
      <ErrorMessage error={message} equalError={EPollError.errorTitle} className="h-[10px] text-red-500 text-xs"/>
    </div>
    <div className="mb-5">
      <Input placeholder="Коментарий" value={commentInput}
             onChange={(e: ChangeEvent<HTMLInputElement>): void => setCommentInput(e.target.value)}/>
    </div>
    <div className="mt-10 mb-5">
      <AnswersPanel addAnswer={addAnswer}/>
      <ErrorMessage error={message} equalError={EPollError.errorAnswers} className="h-[10px] text-red-500 text-xs"/>
    </div>
    <ListAnswersCreateForm listAnswers={listAnswers} removeAnswer={removeAnswer} updateAnswer={updateAnswer}/>
    <FormSubmitButton loading={loading} title="Создать"/>
  </form>
};

export default FormCreatingPoll;