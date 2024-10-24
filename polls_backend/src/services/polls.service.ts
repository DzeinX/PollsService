import { Injectable } from '@nestjs/common';
import { PollsEntity } from '../entities/polls.entity';
import { AnswersEntity } from '../entities/answers.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../entities/user.entity';
import { SsrPollInterface } from '../interfaces/ssrPoll.interface';
import { SsrAnswerInterface } from '../interfaces/ssrAnswer.interface';
import { paginate, Paginated, PaginateQuery } from 'nestjs-paginate';
import { paginateConfig } from '../polls.config';
import { ResponsePollsEntityInterface } from '../interfaces/responsePollsEntity.interface';
import { ResponsePaginatedPollsEntityInterface } from '../interfaces/responsePaginatedPollsEntity.interface';
import { CodeMessageEnum } from '../enums/codeMessage.enum';
import { MessageInterface } from '../interfaces/message.interface';

@Injectable()
export class PollsService {
  constructor(
    @InjectRepository(PollsEntity)
    private readonly pollsRepository: Repository<PollsEntity>,

    @InjectRepository(AnswersEntity)
    private readonly answersRepository: Repository<AnswersEntity>,

    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>,
  ) {}

  async create(poll: PollsEntity): Promise<MessageInterface> {
    try {
      poll.dateCreated = new Date();
      const pollEntity: PollsEntity = await this.pollsRepository.save(poll);

      for (const answer of pollEntity.answers) {
        answer.poll = pollEntity;
        await this.answersRepository.save(answer);
      }

      return { message: "Успешно создано", code: CodeMessageEnum.success };
    } catch (error) {
      return {message: "Не удалось сохранить опрос", code: CodeMessageEnum.error};
    }
  }

  async findAll(): Promise<ResponsePollsEntityInterface> {
    const polls: PollsEntity[] = await this.pollsRepository.find({ relations: ["answers"], order: {dateCreated: "asc"}})
    return {polls: polls, message: {message: "Успешно надено", code: CodeMessageEnum.success}};
  }

  async findAllWithPaginate(query: PaginateQuery): Promise<ResponsePaginatedPollsEntityInterface> {
    const polls: Paginated<PollsEntity> = await paginate(query, this.pollsRepository, paginateConfig);
    return {data: polls, message: {message: "Успешно надено", code: CodeMessageEnum.success}};
  }

  computeAmountVotes(poll: PollsEntity): number {
    let sum: number = 0;
    poll.answers.forEach((answer: AnswersEntity): void => {
      sum += answer.votes;
    })
    return sum;
  }

  async findAllSsr(): Promise<SsrPollInterface[]> {
    const polls: PollsEntity[] = await this.pollsRepository.find({ relations: ["answers"], order: {dateCreated: "asc"}});

    let pollsSsr: SsrPollInterface[] = [];
    for (const poll of polls) {
      const amountVotes: number = this.computeAmountVotes(poll)
      const answersSsr: SsrAnswerInterface[] = [];
      for (const answer of poll.answers) {
        if (amountVotes === 0) {
          answersSsr.push({...answer, percentage: 0})
        } else {
          answersSsr.push({...answer, percentage: 100 * (answer.votes / amountVotes)})
        }

      }
      const pollSsr: SsrPollInterface = {...poll, answers: answersSsr, conclusion: amountVotes}
      pollsSsr.push(pollSsr)
    }

    return pollsSsr;
  }

  async delete(id: string): Promise<MessageInterface> {
    try {
      await this.pollsRepository.delete(parseInt(id));
      return { message: "Успешно удалено", code: CodeMessageEnum.success };
    } catch (error) {
      return {message: "Не удалось удалить опрос", code: CodeMessageEnum.error};
    }
  }

  async vote(answerId: number, userId: number): Promise<MessageInterface> {
    const answer: AnswersEntity = await this.answersRepository.findOne({ relations: ["users"], where: { id: answerId } });
    answer.votes += 1;

    const user: UserEntity = await this.usersRepository.findOne({ relations: ["answers"], where: { id: userId } });
    answer.users.push(user);
    user.answers.push(answer);

    try {
      await this.answersRepository.save(answer);
      await this.usersRepository.save(user);
      return { message: "Голосование успешно", code: CodeMessageEnum.success };
    } catch (error) {
      return {message: "Не удалось сохранить голос", code: CodeMessageEnum.error};
    }
  }
}
