import { Test, TestingModule } from '@nestjs/testing';
import { DepoimentoService } from './depoimento.service';

describe('DepoimentoService', () => {
  let service: DepoimentoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DepoimentoService],
    }).compile();

    service = module.get<DepoimentoService>(DepoimentoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
