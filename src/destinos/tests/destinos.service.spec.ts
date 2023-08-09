import { Test, TestingModule } from '@nestjs/testing';
import { DestinosService } from '../destinos.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { DestinoRepository } from '../repositories/destino.repository';
import { v4 as uuid } from 'uuid';
import { Destino } from '../entities/destino.entity';
import { CreateDestinoDto } from '../dto/create-destino.dto';
import { UpdateDestinoDto } from '../dto/update-destino.dto';

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
const updateDeleteResult = {
  affected: 1,
};
const updatedDestino = new CreateDestinoDto({
  foto1: 'foto 1-1.png',
  foto2: 'foto 2-1.png',
  meta: 'meta atualizada',
  nome: 'Guadalajara',
  preco: 55.9,
  textoDescritivo: '',
});

describe('DestinosService', () => {
  let destinosService: DestinosService;
  let destinoRepository: DestinoRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DestinosService,
        {
          provide: getRepositoryToken(DestinoRepository),
          useValue: {
            create: jest.fn().mockResolvedValue(destinoEntityList[0]),
            find: jest.fn().mockResolvedValue(destinoEntityList),
            findOneBy: jest
              .fn()
              .mockResolvedValue(new CreateDestinoDto(destinoEntityList[0])),
            update: jest.fn().mockResolvedValue(updateDeleteResult),
            delete: jest.fn().mockResolvedValue(updateDeleteResult),
            save: jest.fn().mockResolvedValue(destinoEntityList[0]),
          },
        },
      ],
    }).compile();

    destinosService = module.get<DestinosService>(DestinosService);
    destinoRepository = module.get<DestinoRepository>(DestinoRepository);
  });

  it('should be defined', () => {
    expect(destinosService).toBeDefined();
    expect(destinoRepository).toBeDefined();
  });

  describe('create', () => {
    it('should create a new destino', async () => {
      // Arrange
      const payload: CreateDestinoDto = {
        foto1: 'foto 1-1.png',
        foto2: 'foto 2-1.png',
        meta: 'meta 1',
        nome: 'Guadalajara',
        preco: 55.9,
        textoDescritivo: '',
      };
      // Act
      const newDestino = await destinosService.create(payload);
      // Assert
      expect(newDestino).toEqual(destinoEntityList[0]);
      expect(destinoRepository.create).toBeCalledTimes(1);
      expect(destinoRepository.save).toBeCalledTimes(1);
    });
  });

  describe('findAll', () => {
    it('should return a destino list', async () => {
      // Act
      const destinos = await destinosService.findAll();
      // Assert
      expect(destinos).toEqual(destinoEntityList);
      expect(destinoRepository.find).toBeCalledTimes(1);
    });
  });

  describe('findOne', () => {
    it('shoud retunr a destino by id', async () => {
      // Act
      const destino = await destinosService.findOne(uuidList[0]);
      // Assert
      expect(destino).toEqual(new CreateDestinoDto(destinoEntityList[0]));
      expect(destinoRepository.findOneBy).toBeCalledTimes(1);
    });
  });

  describe('update', () => {
    it('should return an updated destino', async () => {
      // Arrange
      const payload: UpdateDestinoDto = {
        meta: 'meta atualizada',
      };
      jest.spyOn(destinosService, 'findOne').mockResolvedValue(updatedDestino);
      // Act
      const attDestino = await destinosService.update(uuidList[0], payload);
      // Assert
      expect(attDestino).toEqual(updatedDestino);
      expect(destinoRepository.update).toBeCalledTimes(1);
      expect(destinosService.findOne).toBeCalledTimes(1);
    });
  });

  describe('remove', () => {
    it('should delete a destino', async () => {
      // Act
      const deleteMessage = await destinosService.remove(uuidList[0]);
      // Assert
      expect(deleteMessage.message).toEqual('Destino excluído com sucesso');
      expect(destinoRepository.delete).toBeCalledTimes(1);
    });
  });
});
