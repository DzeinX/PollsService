import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from '../controllers/auth.controller';
import { AuthService } from '../services/auth.service';
import { ResponseUserInterface } from '../interfaces/responseUser.interface';
import { ResponseAnswersEntityInterface } from '../interfaces/responseAnswersEntity.interface';
import { CodeMessageEnum } from '../enums/codeMessage.enum';
import { Column, JoinTable, ManyToMany, ManyToOne } from 'typeorm';
import { PollsEntity } from '../entities/polls.entity';
import { UserEntity } from '../entities/user.entity';

describe('AuthController', () => {
  let authController: AuthController;
  let authService: AuthService;

  const mockAuthService = {
    signIn: jest.fn(),
    getAnswers: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: mockAuthService,
        },
      ],
    }).compile();

    authController = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  describe('signIn', () => {
    it('должен вернуть пользователя при успешной авторизации', async () => {
      const signInDto = { username: 'testuser', password: 'testpassword' };
      const result: ResponseUserInterface = {
        message: { message: 'Вход выполнен успешно', code: CodeMessageEnum.success },
        user: {
          id: 1,
          username: "testuser",
          isAdmin: false,
          answers: []
        },
      };

      jest.spyOn(authService, 'signIn').mockResolvedValue(result);

      expect(await authController.signIn(signInDto)).toBe(result);
      expect(authService.signIn).toHaveBeenCalledWith(signInDto.username, signInDto.password);
    });
  });

  describe('getAnswers', () => {
    it('должен вернуть ответы пользователя', async () => {
      const user = { username: 'testuser' };
      const result: ResponseAnswersEntityInterface = {
        message: { message: 'Вход выполнен успешно', code: CodeMessageEnum.success },
        answers: [
          {
            id: 1,
            answer: "Ответ 1",
            votes: 1,
            poll: null,
            users: null,
          }
        ],
      };

      jest.spyOn(authService, 'getAnswers').mockResolvedValue(result);

      expect(await authController.getAnswers(user)).toBe(result);
      expect(authService.getAnswers).toHaveBeenCalledWith(user.username);
    });
  });
});
