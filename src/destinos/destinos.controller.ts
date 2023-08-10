import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  ParseUUIDPipe,
  Put,
  Query,
} from '@nestjs/common';
import { DestinosService } from './destinos.service';
import { CreateDestinoDto } from './dto/create-destino.dto';
import { UpdateDestinoDto } from './dto/update-destino.dto';
import { CreateDestinoSwagger } from './swagger/create-destino.swagger';
import { GetDestinoSwagger } from './swagger/get-destino.swagger';
import { ApiOperation, ApiResponse, ApiTags, ApiQuery } from '@nestjs/swagger';
import { BadRequestSwagger } from '../helpers/swagger/bad-request.swagger';
import { NotFoundSwagger } from '../helpers/swagger/not-found.swagger';

@Controller('destinos')
@ApiTags('destinos')
export class DestinosController {
  constructor(private readonly destinosService: DestinosService) {}

  @Post()
  @ApiOperation({ summary: 'Adicionar um novo destino.' })
  @ApiResponse({
    status: 201,
    description: 'Novo destino criado com sucesso!',
    type: CreateDestinoSwagger,
  })
  @ApiResponse({
    status: 400,
    description: 'Parâmetros inválidos ou vazios',
    type: BadRequestSwagger,
  })
  create(@Body() createDestinoDto: CreateDestinoDto) {
    return this.destinosService.create(createDestinoDto);
  }

  @Get()
  @ApiOperation({ summary: 'Lista todos os destinos.' })
  @ApiResponse({
    status: 200,
    description: 'Destinos Listados com Sucesso',
    type: GetDestinoSwagger,
    isArray: true,
  })
  @ApiQuery({
    required: false,
    name: 'nome',
    description: 'Nome contém - pesquisa',
  })
  findAll(@Query('nome') nome?: string) {
    return this.destinosService.findAll(nome);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retorna um destino pelo ID' })
  @ApiResponse({
    status: 200,
    description: 'Destinos Encontrado',
    type: CreateDestinoDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Não foi possivel encontrar o destino',
    type: NotFoundSwagger,
  })
  findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.destinosService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({
    summary: 'Atualiza um destino pelo ID',
  })
  @ApiResponse({
    status: 200,
    description: 'Destinos Atualizado com Sucesso',
    type: CreateDestinoDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Parâmetros inválidos ou vazios',
    type: BadRequestSwagger,
  })
  @ApiResponse({
    status: 404,
    description: 'Não foi possivel encontrar o destino',
    type: NotFoundSwagger,
  })
  update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateDestinoDto: UpdateDestinoDto,
  ) {
    return this.destinosService.update(id, updateDestinoDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Remove um destino pelo ID',
  })
  @ApiResponse({
    status: 200,
    description: 'Destinos Removido com Sucesso',
  })
  @ApiResponse({
    status: 404,
    description: 'Não foi possivel encontrar o destino',
    type: NotFoundSwagger,
  })
  remove(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.destinosService.remove(id);
  }
}
