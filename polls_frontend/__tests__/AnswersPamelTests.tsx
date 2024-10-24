import { render, screen, fireEvent } from '@testing-library/react';
import AnswersPanel from '@/components/AnswersPanel/AnswersPanel';

describe('AnswersPanel', () => {
  test('рендерит компонент с правильным заголовком', () => {
    const mockAddAnswer = jest.fn();
    render(<AnswersPanel addAnswer={mockAddAnswer} />);

    // Проверяем наличие текста "Варианты ответов"
    const titleElement = screen.getByText(/варианты ответов/i);
    expect(titleElement).toBeInTheDocument();

    // Проверяем наличие кнопки
    const buttonElement = screen.getByRole('button');
    expect(buttonElement).toBeInTheDocument();
  });

  test('вызывает функцию addAnswer при нажатии на кнопку', () => {
    const mockAddAnswer = jest.fn();
    render(<AnswersPanel addAnswer={mockAddAnswer} />);

    // Находим кнопку
    const buttonElement = screen.getByRole('button');

    // Симулируем клик по кнопке
    fireEvent.click(buttonElement);

    // Проверяем, что mockAddAnswer был вызван
    expect(mockAddAnswer).toHaveBeenCalled();
  });
});
