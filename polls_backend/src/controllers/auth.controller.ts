import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { ResponseUserInterface } from '../interfaces/responseUser.interface';
import { ResponseAnswersEntityInterface } from '../interfaces/responseAnswersEntity.interface';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() signInDto: Record<string, any>): Promise<ResponseUserInterface> {
    return this.authService.signIn(signInDto.username, signInDto.password);
  }

  @Post('get-answers')
  getAnswers(@Body() user: { username: string }): Promise<ResponseAnswersEntityInterface> {
    return this.authService.getAnswers(user.username);
  }
}
