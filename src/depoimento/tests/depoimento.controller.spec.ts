import { Test, TestingModule } from '@nestjs/testing';
import { DepoimentoController } from '../depoimento.controller';
import { DepoimentoService } from '../depoimento.service';

describe('DepoimentoController', () => {
  let controller: DepoimentoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DepoimentoController],
      providers: [
        {
          provide: DepoimentoService,
          useValue: {
            findAll: jest.fn(),
            create: jest.fn(),
            findOne: jest.fn(),
            findHome: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<DepoimentoController>(DepoimentoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
