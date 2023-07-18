import { Injectable } from '@nestjs/common';
import { CreateDepoimentoDto } from './dto/create-depoimento.dto';
import { UpdateDepoimentoDto } from './dto/update-depoimento.dto';
import { Repository } from 'typeorm';
import { Depoimento } from './entities/depoimento.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class DepoimentoService {
  constructor(
    @InjectRepository(Depoimento)
    private readonly depoimentoRepository: Repository<Depoimento>,
  ) {}

  create(createDepoimentoDto: CreateDepoimentoDto) {
    return this.depoimentoRepository
      .createQueryBuilder()
      .insert()
      .values(createDepoimentoDto)
      .execute();
  }

  findAll() {
    return this.depoimentoRepository.createQueryBuilder().getMany();
  }

  findOne(id: string) {
    return this.depoimentoRepository
      .createQueryBuilder()
      .where('id = :id', { id: id })
      .getOne();
  }

  findHome(random: boolean) {
    const selectedOption: string = random ? 'RANDOM()' : 'created_at';
    return this.depoimentoRepository
      .createQueryBuilder()
      .select()
      .orderBy(selectedOption, 'DESC')
      .take(3)
      .getMany();
  }

  update(id: string, updateDepoimentoDto: UpdateDepoimentoDto) {
    return this.depoimentoRepository
      .createQueryBuilder()
      .update(Depoimento)
      .set(updateDepoimentoDto)
      .where('id = :id', { id: id })
      .execute();
  }

  remove(id: string) {
    return this.depoimentoRepository
      .createQueryBuilder()
      .delete()
      .from(Depoimento)
      .where('id = :id', { id: id })
      .execute();
  }
}
