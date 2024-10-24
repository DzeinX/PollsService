import { Module } from '@nestjs/common';
import { AuthController } from '../controllers/auth.controller';
import { AuthService } from '../services/auth.service';
import { UsersService } from '../services/users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [AuthController],
  providers: [AuthService, UsersService],
})
export class AuthModule {}
