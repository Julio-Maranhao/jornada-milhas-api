import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateDepoimentoDto } from './dto/create-depoimento.dto';
import { UpdateDepoimentoDto } from './dto/update-depoimento.dto';
import { DepoimentoRepository } from './repositories/depoimento.repository';

@Injectable()
export class DepoimentoService {
  constructor(private readonly depoimentoRepository: DepoimentoRepository) {}

  async create(createDepoimentoDto: CreateDepoimentoDto) {
    const insertResult = await this.depoimentoRepository.qb_create(
      createDepoimentoDto,
    );

    if (!insertResult.identifiers[0]?.id) {
      throw new NotFoundException('Não foi possível criar o depoimento');
    }

    return await this.depoimentoRepository.qb_findOne(
      insertResult.identifiers[0].id,
    );
  }

  async findAll() {
    return await this.depoimentoRepository.find();
  }

  async findOne(id: string) {
    return await this.depoimentoRepository.qb_findOne(id);
  }

  async findHome(random: boolean) {
    return await this.depoimentoRepository.qb_findHome(random);
  }

  async update(id: string, updateDepoimentoDto: UpdateDepoimentoDto) {
    const updateResult = await this.depoimentoRepository.qb_update(
      id,
      updateDepoimentoDto,
    );
    if (updateResult.affected < 1) {
      throw new BadRequestException('Não foi possível atualizar o depoimento.');
    }

    return await this.depoimentoRepository.qb_findOne(id);
  }

  async remove(id: string) {
    const deleteResult = await this.depoimentoRepository.qb_remove(id);

    if (deleteResult.affected < 1) {
      throw new BadRequestException('Não foi possível excluir o depoimento.');
    }

    return { message: 'Depoimento excluído com sucesso', statusCode: 200 };
  }
}
