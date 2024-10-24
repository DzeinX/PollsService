import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import AuthForm from "@/components/AuthForm/AuthForm";
import authStore from "@/store/AuthStore";
import pageStore from "@/store/PageStore";
import { EPage } from "@/enums/EPage";

// Мокаем зависимости
jest.mock("@/store/AuthStore");
jest.mock("@/store/PageStore");
jest.mock("@/utils/validateUserFields");

describe("AuthForm Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("рендерит элементы формы корректно", () => {
    render(<AuthForm />);

    // Проверяем, что поля для имени пользователя и пароля рендерятся
    expect(screen.getByPlaceholderText(/Имя пользователя/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Пароль/i)).toBeInTheDocument();

    // Проверяем, что кнопка отправки рендерится
    expect(screen.getByText(/Войти/i)).toBeInTheDocument();
  });

  test("должен аутентифицировать, если сессия существует", () => {
    (authStore.authenticateFromSession as jest.Mock).mockReturnValue(true);

    render(<AuthForm />);

    // Проверяем, что страница меняется на опросы после аутентификации сессии
    expect(pageStore.changePage).toHaveBeenCalledWith(EPage.polls);
  });

  test("отображает сообщение об ошибке при неудачной аутентификации", async () => {
    require("@/utils/validateUserFields").validateUserFields.mockReturnValue(true);

    (authStore.authenticate as jest.Mock).mockResolvedValue(false);

    render(<AuthForm />);

    // Заполняем поля формы
    fireEvent.change(screen.getByPlaceholderText(/Имя пользователя/i), {
      target: { value: "validUsername" },
    });
    fireEvent.change(screen.getByPlaceholderText(/Пароль/i), {
      target: { value: "validPassword" },
    });

    // Отправляем форму
    fireEvent.submit(screen.getByText(/Войти/i));

    await waitFor(() => {
      // Проверяем, что метод authenticate был вызван с правильными параметрами
      expect(authStore.authenticate).toHaveBeenCalledWith("validUsername", "validPassword");
      // Проверяем, что сообщение об ошибке отображается
      expect(screen.getByText(/Не правильный логин или пароль/i)).toBeInTheDocument();
    });
  });

  test("успешная аутентификация перенаправляет на страницу опросов", async () => {
    require("@/utils/validateUserFields").validateUserFields.mockReturnValue(true);

    (authStore.authenticate as jest.Mock).mockResolvedValue(true);

    render(<AuthForm />);

    // Заполняем поля формы
    fireEvent.change(screen.getByPlaceholderText(/Имя пользователя/i), {
      target: { value: "validUsername" },
    });
    fireEvent.change(screen.getByPlaceholderText(/Пароль/i), {
      target: { value: "validPassword" },
    });

    // Отправляем форму
    fireEvent.submit(screen.getByText(/Войти/i));

    await waitFor(() => {
      // Проверяем, что метод authenticate был вызван с правильными параметрами
      expect(authStore.authenticate).toHaveBeenCalledWith("validUsername", "validPassword");
      // Проверяем, что страница изменилась на опросы
      expect(pageStore.changePage).toHaveBeenCalledWith(EPage.polls);
    });
  });

  test("показывает индикатор загрузки во время процесса аутентификации", async () => {
    require("@/utils/validateUserFields").validateUserFields.mockReturnValue(true);

    (authStore.authenticate as jest.Mock).mockImplementation(() => new Promise((resolve) => setTimeout(resolve, 1000)));

    render(<AuthForm />);

    // Заполняем поля формы
    fireEvent.change(screen.getByPlaceholderText(/Имя пользователя/i), {
      target: { value: "validUsername" },
    });
    fireEvent.change(screen.getByPlaceholderText(/Пароль/i), {
      target: { value: "validPassword" },
    });

    const submitButton = screen.getByText(/Войти/i);

    // Отправляем форму
    fireEvent.submit(submitButton);

    // Проверяем, что индикатор загрузки виден
    expect(submitButton.closest('button')).toHaveAttribute('disabled');

    await waitFor(() => {
      // Как только промис разрешается, проверяем, что состояние загрузки убрано
      expect(submitButton.closest('button')).not.toHaveAttribute('disabled=""');
    });
  });
});
