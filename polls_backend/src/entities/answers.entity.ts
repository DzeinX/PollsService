import { Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { PollsEntity } from './polls.entity';
import { UserEntity } from './user.entity';

@Entity({ name: 'answers' })
export class AnswersEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  answer: string;

  @Column({ default: 0 })
  votes: number;

  @ManyToOne(() => PollsEntity, (poll) => poll.answers, { onDelete: 'CASCADE' })
  poll: PollsEntity;

  @ManyToMany(() => UserEntity)
  @JoinTable()
  users: UserEntity[];
}
