import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  ParseUUIDPipe,
} from '@nestjs/common';
import { DepoimentoService } from './depoimento.service';
import { CreateDepoimentoDto } from './dto/create-depoimento.dto';
import { UpdateDepoimentoDto } from './dto/update-depoimento.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateDepoimentoSwagger } from './swagger/create-depoimento.swagger copy';
import { BadRequestSwagger } from '../helpers/swagger/bad-request.swagger';
import { GetDepoimentoSwagger } from './swagger/get-depoimento.swagger';
import { NotFoundSwagger } from 'src/helpers/swagger/not-found.swagger';

@Controller('/depoimentos')
@ApiTags('depoimentos')
export class DepoimentoController {
  constructor(private readonly depoimentoService: DepoimentoService) {}

  @Post()
  @ApiOperation({ summary: 'Adicionar um novo depoimento.' })
  @ApiResponse({
    status: 201,
    description: 'Novo depoimento criado com sucesso!',
    type: CreateDepoimentoSwagger,
  })
  @ApiResponse({
    status: 400,
    description: 'Parâmetros inválidos ou vazios',
    type: BadRequestSwagger,
  })
  create(@Body() createDepoimentoDto: CreateDepoimentoDto) {
    return this.depoimentoService.create(createDepoimentoDto);
  }

  @Get()
  @ApiOperation({ summary: 'Lista todos os depoimentos.' })
  @ApiResponse({
    status: 200,
    description: 'Depoimentos Listados com Sucesso',
    type: GetDepoimentoSwagger,
    isArray: true,
  })
  findAll() {
    return this.depoimentoService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retorna um depoimento pelo ID' })
  @ApiResponse({
    status: 200,
    description: 'Depoimento Encontrado',
    type: CreateDepoimentoDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Não foi possivel encontrar o depoimento',
    type: NotFoundSwagger,
  })
  findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.depoimentoService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({
    summary: 'Atualiza um depoimento pelo ID',
  })
  @ApiResponse({
    status: 200,
    description: 'Depoimento Atualizado com Sucesso',
    type: CreateDepoimentoDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Parâmetros inválidos ou vazios',
    type: BadRequestSwagger,
  })
  @ApiResponse({
    status: 404,
    description: 'Não foi possivel encontrar o depoimento',
    type: NotFoundSwagger,
  })
  update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateDepoimentoDto: UpdateDepoimentoDto,
  ) {
    return this.depoimentoService.update(id, updateDepoimentoDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Remove um depoimento pelo ID',
  })
  @ApiResponse({
    status: 200,
    description: 'Depoimento Removido com Sucesso',
  })
  @ApiResponse({
    status: 404,
    description: 'Não foi possivel encontrar o depoimento',
    type: NotFoundSwagger,
  })
  remove(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.depoimentoService.remove(id);
  }
}
