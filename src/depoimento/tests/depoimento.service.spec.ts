/* eslint-disable @typescript-eslint/no-empty-function */
import { Test, TestingModule } from '@nestjs/testing';
import { DepoimentoService } from '../depoimento.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { DepoimentoRepository } from '../repositories/depoimento.repository';
import { Depoimento } from '../entities/depoimento.entity';
import { v4 as uuid } from 'uuid';
import { InsertResult } from 'typeorm';
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
const createInsertResult: InsertResult = {
  identifiers: [{ id: uuidList[3] }],
  generatedMaps: [],
  raw: undefined,
};
const deleteOrUpdateResult = {
  affected: 1,
};

describe('DepoimentoService', () => {
  let depoimentoService: DepoimentoService;
  let depoimentoRepository: DepoimentoRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DepoimentoService,
        {
          provide: getRepositoryToken(DepoimentoRepository),
          useValue: {
            find: jest.fn().mockResolvedValue(depoimentoEntityList),
            qb_create: jest.fn().mockResolvedValue(createInsertResult),
            qb_findOne: jest.fn().mockResolvedValue(depoimentoEntityList[0]),
            qb_findHome: jest.fn().mockResolvedValue(depoimentoEntityList),
            qb_update: jest.fn().mockResolvedValue(deleteOrUpdateResult),
            qb_remove: jest.fn().mockResolvedValue(deleteOrUpdateResult),
          },
        },
      ],
    }).compile();

    depoimentoService = module.get<DepoimentoService>(DepoimentoService);
    depoimentoRepository = module.get<DepoimentoRepository>(
      getRepositoryToken(DepoimentoRepository),
    );
  });

  it('should be defined', () => {
    expect(depoimentoService).toBeDefined();
    expect(depoimentoRepository).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of depoimentos', async () => {
      // Act
      const result = await depoimentoService.findAll();
      // Assert
      expect(result).toEqual(depoimentoEntityList);
      expect(depoimentoRepository.find).toHaveBeenCalledTimes(1);
    });

    it('should throw an exception', () => {
      // Arrange
      jest
        .spyOn(depoimentoRepository, 'find')
        .mockRejectedValueOnce(new Error());

      // Assert
      expect(depoimentoService.findAll()).rejects.toThrowError();
    });
  });

  describe('create', () => {
    it('should create a new depoimento item successfully', async () => {
      // Arrange
      const payload: CreateDepoimentoDto = {
        foto: 'foto.png',
        username: 'teste 1',
        depoimento: 'depoimento 1',
      };
      // Act
      const result = await depoimentoService.create(payload);
      // Assert
      expect(result).toEqual(depoimentoEntityList[0]);
      expect(depoimentoRepository.qb_create).toHaveBeenCalledTimes(1);
      expect(depoimentoRepository.qb_findOne).toHaveBeenCalledTimes(1);
    });

    it('should throw an exception', async () => {
      // Arrange
      const payload: CreateDepoimentoDto = {
        foto: 'foto.png',
        username: 'teste 1',
        depoimento: 'depoimento 1',
      };
      jest.spyOn(depoimentoRepository, 'qb_create').mockResolvedValue({
        identifiers: [],
        generatedMaps: [],
        raw: undefined,
      });
      // Assert
      expect(depoimentoService.create(payload)).rejects.toThrowError();
    });
  });

  describe('findOne', () => {
    it('should find a single depoimento from an existent id', async () => {
      // Act
      const result = await depoimentoService.findOne(uuidList[0]);
      // Assert
      expect(result).toEqual(depoimentoEntityList[0]);
      expect(depoimentoRepository.qb_findOne).toHaveBeenCalledTimes(1);
    });

    it('should throw an exception', async () => {
      // Assert
      expect(depoimentoService.findOne('')).rejects.toThrowError();
      expect(depoimentoRepository.qb_findOne).toHaveBeenCalledTimes(1);
    });
  });

  describe('findHome', () => {
    it('should return an array of depoimentos', async () => {
      // Act
      const result = await depoimentoService.findHome(true);
      // Assert
      expect(result).toEqual(depoimentoEntityList);
      expect(depoimentoRepository.qb_findHome).toHaveBeenCalledTimes(1);
    });

    it('should throw an exception', () => {
      // Arrange
      jest
        .spyOn(depoimentoRepository, 'qb_findHome')
        .mockRejectedValueOnce(new Error());

      // Assert
      expect(depoimentoService.findHome(true)).rejects.toThrowError();
    });
  });

  describe('update', () => {});

  describe('delete', () => {});
});
