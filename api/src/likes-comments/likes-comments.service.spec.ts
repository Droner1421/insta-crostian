import { Test, TestingModule } from '@nestjs/testing';
import { LikesCommentsService } from './likes-comments.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Like } from './entities/like.entity';
import { Comment } from './entities/comment.entity';

describe('LikesCommentsService', () => {
  let service: LikesCommentsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LikesCommentsService,
        {
          provide: getRepositoryToken(Like),
          useValue: {
            create: jest.fn(),
            save: jest.fn(),
            find: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
          },
        },
        {
          provide: getRepositoryToken(Comment),
          useValue: {
            create: jest.fn(),
            save: jest.fn(),
            find: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<LikesCommentsService>(LikesCommentsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
