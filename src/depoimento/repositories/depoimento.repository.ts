import { Repository } from 'typeorm';
import { Depoimento } from '../entities/depoimento.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateDepoimentoDto } from '../dto/create-depoimento.dto';
import { UpdateDepoimentoDto } from '../dto/update-depoimento.dto';
import { NotFoundException } from '@nestjs/common';

export class DepoimentoRepository extends Repository<Depoimento> {
  constructor(
    @InjectRepository(Depoimento)
    private readonly depoimentoRepository: Repository<Depoimento>,
  ) {
    super(
      depoimentoRepository.target,
      depoimentoRepository.manager,
      depoimentoRepository.queryRunner,
    );
  }

  async qb_create(createDepoimentoDto: CreateDepoimentoDto) {
    return await this.depoimentoRepository
      .createQueryBuilder()
      .insert()
      .values(createDepoimentoDto)
      .execute();
  }

  async qb_findOne(id: string) {
    const depoimento = await this.depoimentoRepository
      .createQueryBuilder()
      .where('id = :id', { id: id })
      .getOne();

    if (!depoimento) {
      throw new NotFoundException(
        'Não foi possível localizar o depoimento solicitado',
      );
    }
    return depoimento;
  }

  async qb_findHome(random: boolean) {
    const selectedOption: string = random ? 'RANDOM()' : 'created_at';
    return await this.depoimentoRepository
      .createQueryBuilder()
      .select()
      .orderBy(selectedOption, 'DESC')
      .take(3)
      .getMany();
  }

  async qb_update(id: string, updateDepoimentoDto: UpdateDepoimentoDto) {
    return await this.depoimentoRepository
      .createQueryBuilder()
      .update(Depoimento)
      .set(updateDepoimentoDto)
      .where('id = :id', { id: id })
      .execute();
  }

  async qb_remove(id: string) {
    return await this.depoimentoRepository
      .createQueryBuilder()
      .delete()
      .from(Depoimento)
      .where('id = :id', { id: id })
      .execute();
  }
}
