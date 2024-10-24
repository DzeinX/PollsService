import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import FormCreatingPoll from "@/components/FormCreatingPoll/FormCreatingPoll";
import { useCreatePoll } from "@/hooks/useCreatePoll.tsx";

jest.mock("@/hooks/useCreatePoll.tsx");

describe("FormCreatingPoll компонент", () => {
  const addAnswerMock = jest.fn();
  const removeAnswerMock = jest.fn();
  const updateAnswerMock = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useCreatePoll as jest.Mock).mockReturnValue({
      listAnswers: [],
      addAnswer: addAnswerMock,
      removeAnswer: removeAnswerMock,
      updateAnswer: updateAnswerMock,
    });
  });

  test("рендерит элементы формы корректно", () => {
    render(<FormCreatingPoll />);

    // Проверяем, что поля ввода отображаются
    expect(screen.getByPlaceholderText("Вопрос")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Коментарий")).toBeInTheDocument();

    // Проверяем, что кнопка отправки отображается
    expect(screen.getByRole("button", { name: /создать/i })).toBeInTheDocument();
  });

  test("показывает сообщение об ошибке при пустом вопросе", async () => {
    render(<FormCreatingPoll />);

    // Отправляем форму без ввода вопроса
    fireEvent.submit(screen.getByText(/Создать/i));

    // Ждем, пока сообщение об ошибке отобразится
    await waitFor(() => {
      expect(screen.getByText("Пожалуйста, напишите вопрос")).toBeInTheDocument();
    });
  });

  test("показывает сообщение об ошибке при отсутствии ответов", async () => {
    render(<FormCreatingPoll />);

    // Вводим вопрос и отправляем форму без ответов
    fireEvent.change(screen.getByPlaceholderText("Вопрос"), {
      target: { value: "Какой вопрос?" },
    });

    fireEvent.submit(screen.getByText(/Создать/i));

    // Ждем, пока сообщение об ошибке отобразится
    await waitFor(() => {
      expect(screen.getByText("Добавьте хотя бы один ответ на вопрос")).toBeInTheDocument();
    });
  });

  test("показывает сообщение об ошибке при пустом ответе", async () => {
    render(<FormCreatingPoll />);

    // Добавляем пустой ответ
    (useCreatePoll as jest.Mock).mockReturnValue({
      listAnswers: [{ answer: "" }],
      addAnswer: addAnswerMock,
      removeAnswer: removeAnswerMock,
      updateAnswer: updateAnswerMock,
    });

    fireEvent.change(screen.getByPlaceholderText("Вопрос"), {
      target: { value: "Какой вопрос?" },
    });

    fireEvent.submit(screen.getByText(/Создать/i));

    // Ждем, пока сообщение об ошибке отобразится
    await waitFor(() => {
      expect(screen.getByText("Ответ не может быть пустым")).toBeInTheDocument();
    });
  });
});
