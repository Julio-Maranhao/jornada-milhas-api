import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { DepoimentoService } from './depoimento.service';
import { CreateDepoimentoDto } from './dto/create-depoimento.dto';
import { UpdateDepoimentoDto } from './dto/update-depoimento.dto';

@Controller('/depoimentos')
export class DepoimentoController {
  constructor(private readonly depoimentoService: DepoimentoService) {}

  @Post()
  create(@Body() createDepoimentoDto: CreateDepoimentoDto) {
    return this.depoimentoService.create(createDepoimentoDto);
  }

  @Get()
  findAll() {
    return this.depoimentoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.depoimentoService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateDepoimentoDto: UpdateDepoimentoDto,
  ) {
    return this.depoimentoService.update(id, updateDepoimentoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.depoimentoService.remove(id);
  }
}
