import { Test, TestingModule } from '@nestjs/testing';
import { DepoimentoController } from '../depoimento.controller';
import { DepoimentoService } from '../depoimento.service';
import { Depoimento } from '../entities/depoimento.entity';
import { v4 as uuid } from 'uuid';
import { CreateDepoimentoDto } from '../dto/create-depoimento.dto';

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
const updatedDepoimento: Depoimento = new Depoimento({
  id: uuidList[0],
  foto: 'foto.png',
  depoimento: 'depoimento atualizado',
  username: 'teste 1',
});

describe('DepoimentoController', () => {
  let depoimentoController: DepoimentoController;
  let depoimentoService: DepoimentoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DepoimentoController],
      providers: [
        {
          provide: DepoimentoService,
          useValue: {
            findAll: jest.fn().mockResolvedValue(depoimentoEntityList),
            create: jest.fn().mockResolvedValue(depoimentoEntityList[0]),
            findOne: jest.fn().mockResolvedValue(depoimentoEntityList[0]),
            findHome: jest.fn().mockResolvedValue(depoimentoEntityList),
            update: jest.fn().mockResolvedValue(updatedDepoimento),
            remove: jest.fn().mockResolvedValue({
              message: 'Depoimento excluído com sucesso',
              statusCode: 200,
            }),
          },
        },
      ],
    }).compile();

    depoimentoController =
      module.get<DepoimentoController>(DepoimentoController);
    depoimentoService = module.get<DepoimentoService>(DepoimentoService);
  });

  it('should be defined', () => {
    expect(depoimentoController).toBeDefined();
    expect(depoimentoService).toBeDefined();
  });

  describe('create', () => {
    it('should return a new depimento', async () => {
      // Arrange
      const payload: CreateDepoimentoDto = {
        foto: 'foto.png',
        depoimento: 'depoimento 1',
        username: 'teste 1',
      };
      // Act
      const newDepoimento = await depoimentoController.create(payload);
      // Assert
      expect(newDepoimento).toEqual(depoimentoEntityList[0]);
      expect(depoimentoService.create).toBeCalledTimes(1);
    });
  });

  describe('findAll', () => {
    it('should return a list of depoimentos', async () => {
      // Act
      const depoimentos = await depoimentoController.findAll();
      // Assert
      expect(depoimentos).toEqual(depoimentoEntityList);
      expect(depoimentoService.findAll).toBeCalledTimes(1);
    });
  });

  describe('findOne', () => {
    it('should return one depoimento', async () => {
      // Act
      const depoimento = await depoimentoController.findOne(uuidList[0]);
      // Assert
      expect(depoimento).toEqual(depoimentoEntityList[0]);
      expect(depoimentoService.findOne).toBeCalledTimes(1);
    });
  });

  describe('update', () => {
    it('should return an updated depoimento', async () => {
      // Act
      const depoimento = await depoimentoController.update(uuidList[0], {
        depoimento: 'depoimento atualizado',
      });
      // Assert
      expect(depoimento).toEqual(updatedDepoimento);
      expect(depoimentoService.update).toBeCalledTimes(1);
    });
  });

  describe('remove', () => {
    it('should delete a depoimento and return an ok response', async () => {
      // Act
      const deleteResult = await depoimentoController.remove(uuidList[0]);
      // Assert
      expect(deleteResult.message).toEqual('Depoimento excluído com sucesso');
      expect(depoimentoService.remove).toBeCalledTimes(1);
    });
  });
});
