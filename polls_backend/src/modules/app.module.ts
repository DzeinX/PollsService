import { Module } from '@nestjs/common';
import { PollsController } from '../controllers/polls.controller';
import { PollsService } from '../services/polls.service';
import { AuthModule } from './auth.module';
import { UsersModule } from './users.module';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { PollsEntity } from '../entities/polls.entity';
import { AnswersEntity } from '../entities/answers.entity';
import { UserEntity } from '../entities/user.entity';
import { CaslModule } from './casl.module';
import { HandlebarsModule } from '@gboutte/nestjs-hbs';
import { ConfigModule } from '@nestjs/config';
import * as process from 'node:process';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [".env"],
    }),
    TypeOrmModule.forFeature([PollsEntity]),
    TypeOrmModule.forFeature([AnswersEntity]),
    TypeOrmModule.forFeature([UserEntity]),
    AuthModule,
    UsersModule,
    TypeOrmModule.forRoot({
      type: "postgres",
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE_NAME,
      entities: [PollsEntity, AnswersEntity, UserEntity],
      synchronize: !!process.env.DB_SYNCHRONIZE,
      logging: false,
      autoLoadEntities: !!process.env.DB_AUTO_LOAD_ENTITIES,
    }),
    CaslModule,
    HandlebarsModule.forRoot({
      templateDirectory: 'src/views',
      compileOptions: {},
      templateOptions: {},
    })
  ],
  controllers: [PollsController],
  providers: [PollsService],
})
export class AppModule {}
