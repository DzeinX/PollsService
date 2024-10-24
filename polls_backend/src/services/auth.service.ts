import { Injectable } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserEntity } from '../entities/user.entity';
import { ResponseUserInterface } from '../interfaces/responseUser.interface';
import { CodeMessageEnum } from '../enums/codeMessage.enum';
import { ResponseAnswersEntityInterface } from '../interfaces/responseAnswersEntity.interface';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  async signIn(username: string, pass: string): Promise<ResponseUserInterface> {
    const user: UserEntity = await this.usersService.findOne(username);
    if (user === null || user.password !== pass) {
      return {
        message: {
          message: 'Не верный логин или пароль',
          code: CodeMessageEnum.error,
        },
        user: null,
      };
    }
    const { password, ...result } = user;
    return {
      message: { message: 'Вход выполнен успешно', code: CodeMessageEnum.success },
      user: result,
    };
  }

  async getAnswers(username: string): Promise<ResponseAnswersEntityInterface> {
    const user: UserEntity = await this.usersService.findOne(username);
    return { message: { message: 'Успешно получено', code: CodeMessageEnum.success }, answers: user.answers };
  }
}
