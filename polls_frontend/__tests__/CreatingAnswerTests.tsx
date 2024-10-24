import { render, screen, fireEvent } from "@testing-library/react";
import CreatingAnswer from "@/components/CreatingAnswer/CreatingAnswer";
import { IAnswerCreating } from "@/interfaces/IAnswerCreating";

describe("CreatingAnswer Компонент", () => {
  const mockRemoveAnswer = jest.fn();
  const mockUpdateAnswer = jest.fn();
  const answer: IAnswerCreating = { answer: "Тестовый ответ" };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("отображает правильный вариант ответа", () => {
    render(<CreatingAnswer removeAnswer={mockRemoveAnswer} updateAnswer={mockUpdateAnswer} answer={answer} index={0} />);

    // Проверяем, что отображается текст ответа
    expect(screen.getByPlaceholderText(/1 вариант ответа/i)).toBeInTheDocument();
    expect(screen.getByDisplayValue(/Тестовый ответ/i)).toBeInTheDocument();
  });

  test("вызывает updateAnswer при изменении текста", () => {
    render(<CreatingAnswer removeAnswer={mockRemoveAnswer} updateAnswer={mockUpdateAnswer} answer={answer} index={0} />);

    // Находим поле ввода и меняем его значение
    const input = screen.getByPlaceholderText(/1 вариант ответа/i);
    fireEvent.change(input, { target: { value: "Новый ответ" } });

    // Проверяем, что функция обновления ответа была вызвана с правильными аргументами
    expect(mockUpdateAnswer).toHaveBeenCalledWith(0, { answer: "Новый ответ" });
  });
});
