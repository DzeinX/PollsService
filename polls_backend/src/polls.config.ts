import { PaginateConfig } from 'nestjs-paginate';
import { PollsEntity } from './entities/polls.entity';

export const paginateConfig: PaginateConfig<PollsEntity> = {
  /**
   * Required: true (must have a minimum of one column)
   * Type: (keyof PollsEntity)[]
   * Description: These are the columns that are valid to be sorted by.
   */
  sortableColumns: ['id'],

  /**
   * Required: false
   * Type: number
   * Default: 20
   */
  defaultLimit: 1,

  /**
   * Required: false
   * Type: RelationColumn<PollsEntity>
   * Description: Indicates what relations of entity should be loaded.
   */
  relations: ['answers'],
};
