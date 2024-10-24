import { render, screen } from "@testing-library/react";
import GreetingMessage from "@/components/GreetingMessage/GreetingMessage";

describe("Компонент GreetingMessage", () => {
  test("не отображает сообщение, когда message пустой", () => {
    render(<GreetingMessage message="" />);

    // Проверяем, что компонент не рендерит ничего
    expect(screen.queryByText(/.+/)).not.toBeInTheDocument();
  });
});
