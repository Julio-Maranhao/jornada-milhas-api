import { Test, TestingModule } from '@nestjs/testing';
import { DestinosController } from './destinos.controller';
import { DestinosService } from './destinos.service';

describe('DestinosController', () => {
  let controller: DestinosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DestinosController],
      providers: [DestinosService],
    }).compile();

    controller = module.get<DestinosController>(DestinosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
