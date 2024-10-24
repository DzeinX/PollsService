import { AnswersEntity } from './answers.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'polls' })
export class PollsEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ default: '' })
  comment: string;

  @Column()
  dateCreated: Date;

  @OneToMany(() => AnswersEntity, (answer) => answer.poll, {
    onDelete: 'CASCADE',
  })
  answers: AnswersEntity[];
}
