import { render, screen } from "@testing-library/react";
import ErrorMessage from "@/components/ErrorMessage/ErrorMessage";
import { EUserError } from "@/enums/EUserError.ts";

describe("ErrorMessage Компонент", () => {
  const mockError = {
    error: EUserError.errorValidate,
    message: "Неправильные учетные данные",
  };

  test("отображает сообщение об ошибке при совпадении", () => {
    render(<ErrorMessage error={mockError} equalError={EUserError.errorValidate} />);

    // Проверяем, что сообщение об ошибке отображается
    expect(screen.getByRole("alert")).toHaveTextContent("Неправильные учетные данные");
  });

  test("не отображает сообщение об ошибке при несовпадении", () => {
    render(<ErrorMessage error={mockError} equalError={EUserError.errorPassword} />);

    // Проверяем, что сообщение об ошибке не отображается
    expect(screen.queryByRole("alert")).toBeEmptyDOMElement();
  });

  test("поддерживает дополнительные классы", () => {
    render(<ErrorMessage error={mockError} equalError={EUserError.errorValidate} className="custom-class" />);

    // Проверяем, что элемент имеет правильный класс
    expect(screen.getByRole("alert")).toHaveClass("custom-class");
  });
});
