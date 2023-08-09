import { Test, TestingModule } from '@nestjs/testing';
import { DestinosController } from '../destinos.controller';
import { DestinosService } from '../destinos.service';
import { Destino } from '../entities/destino.entity';
import { CreateDestinoDto } from '../dto/create-destino.dto';
import { v4 as uuid } from 'uuid';

const uuidList = [uuid(), uuid(), uuid(), uuid()];
const destinoEntityList: Destino[] = [
  new Destino({
    id: uuidList[0],
    foto1: 'foto 1-1.png',
    foto2: 'foto 2-1.png',
    meta: 'meta 1',
    nome: 'Guadalajara',
    preco: 55.9,
    textoDescritivo: '',
  }),
  new Destino({
    id: uuidList[1],
    foto1: 'foto 1-2.png',
    foto2: 'foto 2-2.png',
    meta: 'meta 2',
    nome: 'Mexico',
    preco: 108.9,
    textoDescritivo: '',
  }),
  new Destino({
    id: uuidList[2],
    foto1: 'foto 1-3.png',
    foto2: 'foto 2-3.png',
    meta: 'meta 3',
    nome: 'Manaus',
    preco: 85.9,
    textoDescritivo: '',
  }),
];
const updatedDestino = new CreateDestinoDto({
  foto1: 'foto 1-1.png',
  foto2: 'foto 2-1.png',
  meta: 'meta atualizada',
  nome: 'Guadalajara',
  preco: 55.9,
  textoDescritivo: '',
});

describe('DestinosController', () => {
  let destinoController: DestinosController;
  let destinoService: DestinosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DestinosController],
      providers: [
        {
          provide: DestinosService,
          useValue: {
            create: jest.fn().mockResolvedValue(destinoEntityList[0]),
            findAll: jest.fn().mockResolvedValue(destinoEntityList),
            findOne: jest
              .fn()
              .mockResolvedValue(new CreateDestinoDto(destinoEntityList[0])),
            update: jest.fn().mockResolvedValue(updatedDestino),
            remove: jest.fn().mockResolvedValue({
              message: 'Destino excluído com sucesso',
              statusCode: 200,
            }),
          },
        },
      ],
    }).compile();

    destinoController = module.get<DestinosController>(DestinosController);
    destinoService = module.get<DestinosService>(DestinosService);
  });

  it('should be defined', () => {
    expect(destinoController).toBeDefined();
    expect(destinoService).toBeDefined();
  });

  describe('create', () => {
    it('should return a new destino', async () => {
      // Act
      const destino = await destinoController.create({
        foto1: 'foto 1-1.png',
        foto2: 'foto 2-1.png',
        meta: 'meta 1',
        nome: 'Guadalajara',
        preco: 55.9,
        textoDescritivo: '',
      });
      // Assert
      expect(destino).toEqual(destinoEntityList[0]);
      expect(destinoService.create).toBeCalledTimes(1);
    });
  });

  describe('findAll', () => {
    it('should return a list od destinos', async () => {
      // Act
      const destinos = await destinoController.findAll();
      // Assert
      expect(destinos).toEqual(destinoEntityList);
      expect(destinoService.findAll).toBeCalledTimes(1);
    });
  });

  describe('findOne', () => {
    it('should return a destino', async () => {
      // Act
      const destino = await destinoController.findOne(uuidList[0]);
      // Assert
      expect(destino).toEqual(new CreateDestinoDto(destinoEntityList[0]));
      expect(destinoService.findOne).toBeCalledTimes(1);
    });
  });

  describe('update', () => {
    it('should return an updated destino', async () => {
      // Act
      const attDestino = await destinoController.update(uuidList[0], {
        meta: 'meta atualizada',
      });
      // Assert
      expect(attDestino).toEqual(updatedDestino);
      expect(destinoService.update).toBeCalledTimes(1);
    });
  });

  describe('delete', () => {
    it('should return a delete message', async () => {
      // Act
      const deleteMessage = await destinoController.remove(uuidList[0]);
      // Assert
      expect(deleteMessage.message).toEqual('Destino excluído com sucesso');
      expect(destinoService.remove).toBeCalledTimes(1);
    });
  });
});
