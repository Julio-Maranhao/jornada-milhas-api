import { Test, TestingModule } from '@nestjs/testing';
import { DepoimentoController } from './depoimento.controller';
import { DepoimentoService } from './depoimento.service';

describe('DepoimentoController', () => {
  let controller: DepoimentoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DepoimentoController],
      providers: [DepoimentoService],
    }).compile();

    controller = module.get<DepoimentoController>(DepoimentoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
