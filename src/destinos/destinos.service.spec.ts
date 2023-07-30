import { Test, TestingModule } from '@nestjs/testing';
import { DestinosService } from './destinos.service';

describe('DestinosService', () => {
  let service: DestinosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DestinosService],
    }).compile();

    service = module.get<DestinosService>(DestinosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
