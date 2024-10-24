import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { PollsService } from '../services/polls.service';
import { PollsEntity } from '../entities/polls.entity';
import { HandlebarsService } from '@gboutte/nestjs-hbs';
import { SsrPollInterface } from '../interfaces/ssrPoll.interface';
import { Paginate, PaginateQuery } from 'nestjs-paginate';
import { ResponsePollsEntityInterface } from '../interfaces/responsePollsEntity.interface';
import { ResponsePaginatedPollsEntityInterface } from '../interfaces/responsePaginatedPollsEntity.interface';
import { MessageInterface } from '../interfaces/message.interface';

@Controller('api/polls')
export class PollsController {
  constructor(
    private readonly pollsService: PollsService,
    private readonly hbsService: HandlebarsService,
  ) {}

  @Get()
  async findAllPolls(): Promise<ResponsePollsEntityInterface> {
    return await this.pollsService.findAll();
  }

  @Get('/one')
  async getPollsByPage(
    @Paginate() query: PaginateQuery,
  ): Promise<ResponsePaginatedPollsEntityInterface> {
    return await this.pollsService.findAllWithPaginate(query);
  }

  @Get('ssr')
  async findAllPollsSsr(): Promise<string> {
    const polls: SsrPollInterface[] = await this.pollsService.findAllSsr();
    return this.hbsService.renderFile('polls_list.hbs', { polls: polls });
  }

  @Post()
  async createPoll(@Body() pollsDto: PollsEntity): Promise<MessageInterface> {
    return await this.pollsService.create(pollsDto);
  }

  @Delete(':id')
  async deletePollById(@Param('id') id: string): Promise<MessageInterface> {
    return await this.pollsService.delete(id);
  }

  @Post(':id/vote')
  async voteById(@Param('id') id: string, @Body('userId') userId: number,): Promise<MessageInterface> {
    return await this.pollsService.vote(parseInt(id), userId);
  }
}
