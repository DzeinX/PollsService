import { render, screen } from "@testing-library/react";
import ListAnswers from "@/components/ListAnswers/ListAnswers";
import { IPoll } from "@/interfaces/IPoll";
import authStore from "@/store/AuthStore.ts";

jest.mock("@/store/AuthStore");

describe("Компонент ListAnswers", () => {
  const doVoteMock = jest.fn();

  test("отображает сообщение, если у опроса нет вариантов ответа", () => {
    const poll: IPoll = {
      id: 1,
      title: "Тестовый опрос",
      comment: "",
      amountVotes: 10,
      dataCreated: new Date(),
      isVote: false,
      answers: []
    };

    render(<ListAnswers poll={poll} doVote={doVoteMock} disabled={false} />);

    // Проверяем, что отображается сообщение об отсутствии вариантов ответа
    expect(screen.getByText(/Упс... Кажется, у этого опроса нет вариантов ответа :\(/i)).toBeInTheDocument();
  });

  test("отображает варианты ответа, если они присутствуют", () => {
    const poll: IPoll = {
      id: 1,
      title: "Тестовый опрос",
      comment: "",
      amountVotes: 10,
      dataCreated: new Date(),
      isVote: false,
      answers: [
        { id: 1, answer: "Ответ 1", votes: 5 },
        { id: 2, answer: "Ответ 2", votes: 5 },
      ]
    };

    // Мокаем метод getAnswersIds для возврата пустого массива
    (authStore.getAnswersIds as jest.Mock).mockReturnValue([]);

    render(<ListAnswers poll={poll} doVote={doVoteMock} disabled={false} />);

    // Проверяем, что отображаются варианты ответа
    expect(screen.getByText("Ответ 1")).toBeInTheDocument();
    expect(screen.getByText("Ответ 2")).toBeInTheDocument();
  });

  test("передает правильные пропсы компоненту PollAnswer", () => {
    const poll: IPoll = {
      id: 1,
      title: "Тестовый опрос",
      comment: "",
      amountVotes: 10,
      dataCreated: new Date(),
      isVote: false,
      answers: [
        { id: 1, answer: "Ответ 1", votes: 5 },
        { id: 2, answer: "Ответ 2", votes: 5 },
      ]
    };

    (authStore.getAnswersIds as jest.Mock).mockReturnValue([1]);

    render(<ListAnswers poll={poll} doVote={doVoteMock} disabled={false} />);

    // Проверяем, что PollAnswer вызывается с правильными пропсами
    expect(screen.getByText("Ответ 1")).toBeInTheDocument();
    expect(screen.getByText("Ответ 2")).toBeInTheDocument();
  });
});
