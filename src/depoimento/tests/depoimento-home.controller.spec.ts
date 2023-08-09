import { Test, TestingModule } from '@nestjs/testing';
import { DepoimentoHomeController } from '../depoimento-home.controller';
import { DepoimentoService } from '../depoimento.service';
import { Depoimento } from '../entities/depoimento.entity';
import { v4 as uuid } from 'uuid';

const uuidList = [uuid(), uuid(), uuid(), uuid()];
const depoimentoEntityList: Depoimento[] = [
  new Depoimento({
    id: uuidList[0],
    foto: 'foto.png',
    depoimento: 'depoimento 1',
    username: 'teste 1',
  }),
  new Depoimento({
    id: uuidList[1],
    foto: 'foto.png',
    depoimento: 'depoimento 2',
    username: 'teste 2',
  }),
  new Depoimento({
    id: uuidList[2],
    foto: 'foto.png',
    depoimento: 'depoimento 3',
    username: 'teste 3',
  }),
];

describe('DepoimentoHomeController', () => {
  let depoimentoHomeController: DepoimentoHomeController;
  let depoimentoService: DepoimentoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DepoimentoHomeController],
      providers: [
        {
          provide: DepoimentoService,
          useValue: {
            findHome: jest.fn().mockReturnValue(depoimentoEntityList),
          },
        },
      ],
    }).compile();

    depoimentoHomeController = module.get<DepoimentoHomeController>(
      DepoimentoHomeController,
    );
    depoimentoService = module.get<DepoimentoService>(DepoimentoService);
  });

  it('should be defined', () => {
    expect(depoimentoHomeController).toBeDefined();
  });

  describe('findHome', () => {
    it('should return a depoimento list', async () => {
      // Act
      const depoimentos = await depoimentoHomeController.findHome();
      // Assert
      expect(depoimentos).toEqual(depoimentoEntityList);
      expect(depoimentoService.findHome).toBeCalledTimes(1);
    });
  });
});
