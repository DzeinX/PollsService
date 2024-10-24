import { render, screen } from "@testing-library/react";
import FormSubmitButton from "@/components/FormSubmitButton/FormSubmitButton";

jest.mock("@iconify/react", () => ({
  Icon: () => <span className="animate-spin">Icon</span>,
}));

describe("Компонент FormSubmitButton", () => {
  test("рендерит кнопку с текстом при loading = false", () => {
    render(<FormSubmitButton loading={false} title="Создать" />);

    // Проверяем, что кнопка отображает текст "Создать"
    expect(screen.getByText("Создать")).toBeInTheDocument();

    // Проверяем, что кнопка не отключена
    expect(screen.getByText("Создать")).not.toBeDisabled();

    // Проверяем, что иконка не отображается
    expect(screen.queryByText("Icon")).not.toBeInTheDocument();
  });

  test("рендерит анимацию загрузки при loading = true", () => {
    render(<FormSubmitButton loading={true} title="Создать" />);

    // Проверяем, что кнопка отключена
    expect(screen.getByText("Icon")).toBeInTheDocument();

    // Проверяем, что текст кнопки не отображается
    expect(screen.queryByText("Создать")).not.toBeInTheDocument();

    // Проверяем, что иконка отображается с классом для анимации
    expect(screen.getByText("Icon").closest("span")).toHaveClass("animate-spin");
  });
});
