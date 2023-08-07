import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateDestinoDto } from './dto/create-destino.dto';
import { UpdateDestinoDto } from './dto/update-destino.dto';
import { DestinoRepository } from './repositories/destino.repository';
import { ILike } from 'typeorm';

@Injectable()
export class DestinosService {
  constructor(private readonly destinoRepository: DestinoRepository) {}

  async create(createDestinoDto: CreateDestinoDto) {
    const destino = await this.destinoRepository.create(createDestinoDto);

    return await this.destinoRepository.save(destino);
  }

  async findAll(nome: string) {
    const options = nome ? { where: { nome: ILike(`%${nome}%`) } } : {};
    return await this.destinoRepository.find(options);
  }

  async findOne(id: string) {
    const destino = await this.destinoRepository.findOneBy({ id });

    if (!destino) {
      throw new NotFoundException('Não foi possível localizar o destino.');
    }
    return new CreateDestinoDto(destino);
  }

  async update(id: string, updateDestinoDto: UpdateDestinoDto) {
    const updatedDestino = await this.destinoRepository.update(
      { id },
      updateDestinoDto,
    );

    if (updatedDestino.affected < 1) {
      throw new NotFoundException('Não foi possível atualizar o destino.');
    }

    return await this.findOne(id);
  }

  async remove(id: string) {
    await this.findOne(id);

    const deleteResult = await this.destinoRepository.delete(id);

    if (deleteResult.affected < 1) {
      throw new BadRequestException('Não foi possível excluir o depoimento.');
    }

    return { message: 'Destino excluído com sucesso', statusCode: 200 };
  }
}
