import { render, screen, fireEvent } from "@testing-library/react";
import CreatingPoll from "@/components/CreatingPoll/CreatingPoll";

jest.mock("@/components/FormCreatingPoll/FormCreatingPoll", () => () => <div>Форма создания опроса</div>);

describe("CreatingPoll Компонент", () => {
  test("рендерится корректно", () => {
    render(<CreatingPoll />);

    // Проверяем, что триггер отображается
    expect(screen.getByText(/Создать опрос/i)).toBeInTheDocument();
  });

  test("открывает диалог при клике на триггер", () => {
    render(<CreatingPoll />);

    // Находим триггер и кликаем по нему
    const trigger = screen.getByText(/Создать опрос/i);
    fireEvent.click(trigger);

    // Проверяем, что заголовок диалога отображается
    expect(screen.getByText(/Создание опроса/i)).toBeInTheDocument();
    // Проверяем, что форма создания опроса отображается
    expect(screen.getByText(/Форма создания опроса/i)).toBeInTheDocument();
  });
});
