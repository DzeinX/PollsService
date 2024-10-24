import { render, screen } from "@testing-library/react";
import PollsControlPanel from "@/components/PollsControlPanel/PollsControlPanel";
import { ETab } from "@/enums/ETab.ts";
import authStore from "@/store/AuthStore.ts";
import {IAnswerLessUser} from "../src/interfaces/IAnswerLessUser";

jest.mock("@/store/AuthStore.ts");

describe("Компонент PollsControlPanel", () => {
  const setTabViewMock = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("не отображается, если пользователь не администратор", () => {
    render(<PollsControlPanel tabView={ETab.scroll} setTabView={setTabViewMock} />);

    // Проверяем, что компонент не отображается
    expect(screen.queryByText(/Создать опрос/i)).toBeNull();
    expect(screen.queryByText(/Список/i)).toBeNull();
  });

  test("отображается, если пользователь администратор", () => {
    // Устанавливаем пользователя как администратора
    (authStore.user as IAnswerLessUser) = { id: 1, username: "", isAdmin: true };

    render(<PollsControlPanel tabView={ETab.scroll} setTabView={setTabViewMock} />);

    // Проверяем, что оба подкомпонента отображаются
    expect(screen.getByText(/Создать опрос/i)).toBeInTheDocument();
    expect(screen.getByText(/Список/i)).toBeInTheDocument();
  });
});
