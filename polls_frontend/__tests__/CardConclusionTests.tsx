import { render, screen } from "@testing-library/react";
import CardConclusion from "@/components/CardConclusion/CardConclusion";

describe("CardConclusion Компонент", () => {

  test("отображает сообщение, если голосов нет", () => {
    // Рендерим компонент с количеством голосов равным 0
    render(<CardConclusion amountVotes={0} />);

    // Проверяем, что отображается сообщение "Проголосуйте первым!"
    expect(screen.getByText(/Проголосуйте первым!/i)).toBeInTheDocument();
  });

  test("отображает количество голосов, если они есть", () => {
    const amountVotes = 5;

    // Рендерим компонент с количеством голосов
    render(<CardConclusion amountVotes={amountVotes} />);

    // Проверяем, что отображается сообщение с количеством голосов
    expect(screen.getByText(/всего голосов: 5/i)).toBeInTheDocument();
  });

});
