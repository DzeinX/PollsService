import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { AnswersEntity } from './answers.entity';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  isAdmin: boolean;

  @ManyToMany(() => AnswersEntity)
  @JoinTable()
  answers: AnswersEntity[];
}
