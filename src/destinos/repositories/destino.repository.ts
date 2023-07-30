import { Repository } from 'typeorm';
import { Destino } from '../entities/destino.entity';
import { InjectRepository } from '@nestjs/typeorm';

export class DestinoRepository extends Repository<Destino> {
  constructor(
    @InjectRepository(Destino)
    private readonly destinoRepository: Repository<Destino>,
  ) {
    super(
      destinoRepository.target,
      destinoRepository.manager,
      destinoRepository.queryRunner,
    );
  }
}
