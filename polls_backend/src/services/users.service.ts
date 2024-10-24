import { Injectable } from '@nestjs/common';
import { UserEntity } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>,
  ) {}

  findAll(): Promise<UserEntity[]> {
    return this.usersRepository.find();
  }

  findOne(username: string): Promise<UserEntity> {
    return this.usersRepository.findOne({
      where: {
        username: username
      },
      relations: ["answers"]
    });
  }

  async remove(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }
}
