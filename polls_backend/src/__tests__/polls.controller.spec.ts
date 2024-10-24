import { Test, TestingModule } from '@nestjs/testing';
import { PollsController } from '../controllers/polls.controller';
import { PollsService } from '../services/polls.service';
import { HandlebarsService } from '@gboutte/nestjs-hbs';
import { PollsEntity } from '../entities/polls.entity';
import { ResponsePollsEntityInterface } from '../interfaces/responsePollsEntity.interface';
import { ResponsePaginatedPollsEntityInterface } from '../interfaces/responsePaginatedPollsEntity.interface';
import { MessageInterface } from '../interfaces/message.interface';
import { PaginateQuery } from 'nestjs-paginate';
import { CodeMessageEnum } from '../enums/codeMessage.enum';

describe('PollsController', () => {
  let controller: PollsController;
  let pollsService: PollsService;
  let hbsService: HandlebarsService;

  const mockPollsService = {
    findAll: jest.fn(),
    findAllWithPaginate: jest.fn(),
    findAllSsr: jest.fn(),
    create: jest.fn(),
    delete: jest.fn(),
    vote: jest.fn(),
  };

  const mockHbsService = {
    renderFile: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PollsController],
      providers: [
        {
          provide: PollsService,
          useValue: mockPollsService,
        },
        {
          provide: HandlebarsService,
          useValue: mockHbsService,
        },
      ],
    }).compile();

    controller = module.get<PollsController>(PollsController);
    pollsService = module.get<PollsService>(PollsService);
    hbsService = module.get<HandlebarsService>(HandlebarsService);
  });

  describe('findAllPolls', () => {
    it('должен вернуть список опросов', async () => {
      const result: ResponsePollsEntityInterface = {
        polls: [
          {
            id: 1,
            title: 'Вопрос',
            comment: '',
            dateCreated: new Date(),
            answers: [],
          },
        ],
        message: {
          message: 'Успешно надено',
          code: CodeMessageEnum.success,
        },
      };
      jest.spyOn(pollsService, 'findAll').mockResolvedValue(result);

      expect(await controller.findAllPolls()).toBe(result);
      expect(pollsService.findAll).toHaveBeenCalled();
    });
  });

  describe('getPollsByPage', () => {
    it('должен вернуть опросы по страницам', async () => {
      const query: PaginateQuery = { path: '', limit: 1 };
      const result: ResponsePaginatedPollsEntityInterface = {
        data: {
          data: [
            {
              id: 1,
              title: 'Вопрос',
              comment: '',
              dateCreated: new Date(),
              answers: [],
            },
          ],
          meta: null,
          links: null,
        },
        message: {
          message: 'Успешно надено',
          code: CodeMessageEnum.success,
        },
      };
      jest.spyOn(pollsService, 'findAllWithPaginate').mockResolvedValue(result);

      expect(await controller.getPollsByPage(query)).toBe(result);
      expect(pollsService.findAllWithPaginate).toHaveBeenCalledWith(query);
    });
  });

  describe('findAllPollsSsr', () => {
    it('должен отрендерить шаблон с Handlebars', async () => {
      const polls = [
        {
          id: 1,
          title: 'Вопрос',
          comment: '',
          dateCreated: new Date(),
          answers: [],
          conclusion: 0,
        },
      ];
      jest.spyOn(pollsService, 'findAllSsr').mockResolvedValue(polls);
      jest.spyOn(hbsService, 'renderFile').mockReturnValue('rendered string');

      expect(await controller.findAllPollsSsr()).toBe('rendered string');
      expect(pollsService.findAllSsr).toHaveBeenCalled();
      expect(hbsService.renderFile).toHaveBeenCalledWith('polls_list.hbs', {
        polls,
      });
    });
  });

  describe('createPoll', () => {
    it('должен создать новый опрос', async () => {
      const pollsDto: PollsEntity = {
        answers: [], comment: '', dateCreated: new Date(), id: 1, title: ''
      };
      const result: MessageInterface = { message: "Успешно создано", code: CodeMessageEnum.success };
      jest.spyOn(pollsService, 'create').mockResolvedValue(result);

      expect(await controller.createPoll(pollsDto)).toBe(result);
      expect(pollsService.create).toHaveBeenCalledWith(pollsDto);
    });
  });

  describe('deletePollById', () => {
    it('должен удалить опрос по его id', async () => {
      const id = '1';
      const result: MessageInterface = { message: "Успешно удалено", code: CodeMessageEnum.success };
      jest.spyOn(pollsService, 'delete').mockResolvedValue(result);

      expect(await controller.deletePollById(id)).toBe(result);
      expect(pollsService.delete).toHaveBeenCalledWith(id);
    });
  });

  describe('voteById', () => {
    it('должен записать голос', async () => {
      const id = '1';
      const userId = 1;
      const result: MessageInterface = { message: "Голосование успешно", code: CodeMessageEnum.success };
      jest.spyOn(pollsService, 'vote').mockResolvedValue(result);

      expect(await controller.voteById(id, userId)).toBe(result);
      expect(pollsService.vote).toHaveBeenCalledWith(parseInt(id), userId);
    });
  });
});
