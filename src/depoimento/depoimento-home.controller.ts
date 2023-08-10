import { Controller, Get, Query } from '@nestjs/common';
import { DepoimentoService } from './depoimento.service';
import { ApiOperation, ApiResponse, ApiTags, ApiQuery } from '@nestjs/swagger';
import { GetDepoimentoSwagger } from './swagger/get-depoimento.swagger';

@Controller('/depoimentos-home')
@ApiTags('depoimentos home')
export class DepoimentoHomeController {
  constructor(private readonly depoimentoService: DepoimentoService) {}

  @Get()
  @ApiOperation({ summary: 'Lista 3 depoimentos aleatoriamente ou não.' })
  @ApiResponse({
    status: 200,
    description: 'Depoimentos Listados com Sucesso',
    type: GetDepoimentoSwagger,
    isArray: true,
  })
  @ApiQuery({
    required: false,
    name: 'random',
    description:
      'true - retorna 3 aleatoriamente, false - retorna os 3 ultimos',
  })
  findHome(@Query('random') random?: boolean) {
    return this.depoimentoService.findHome(random);
  }
}
