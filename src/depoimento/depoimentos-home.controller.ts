import { Controller, Get, Query } from '@nestjs/common';
import { DepoimentoService } from './depoimento.service';

@Controller('/depoimentos-home')
export class DepoimentoHomeController {
  constructor(private readonly depoimentoService: DepoimentoService) {}

  @Get()
  findHome(@Query('random') random: boolean) {
    return this.depoimentoService.findHome(random);
  }
}
