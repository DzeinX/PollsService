import { MessageInterface } from './message.interface';
import { Paginated } from 'nestjs-paginate';
import { PollsEntity } from '../entities/polls.entity';

export interface ResponsePaginatedPollsEntityInterface {
  message: MessageInterface;
  data: Paginated<PollsEntity>
}