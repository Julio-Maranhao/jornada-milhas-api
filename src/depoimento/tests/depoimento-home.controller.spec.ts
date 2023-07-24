import { Test, TestingModule } from '@nestjs/testing';
import { DepoimentoHomeController } from '../depoimento-home.controller';
import { DepoimentoService } from '../depoimento.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { DepoimentoRepository } from '../repositories/depoimento.repository';

describe('DepoimentoHomeController', () => {
  let controller: DepoimentoHomeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DepoimentoHomeController],
      providers: [
        DepoimentoService,
        {
          provide: getRepositoryToken(DepoimentoRepository),
          useValue: {
            find: jest.fn(),
            qb_create: jest.fn(),
            qb_findOne: jest.fn(),
            qb_findHome: jest.fn(),
            qb_update: jest.fn(),
            qb_remove: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<DepoimentoHomeController>(DepoimentoHomeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
