import { Module } from '@nestjs/common';
import { DepoimentoService } from './depoimento.service';
import { DepoimentoController } from './depoimento.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Depoimento } from './entities/depoimento.entity';
import { DepoimentoHomeController } from './depoimentos-home.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Depoimento])],
  controllers: [DepoimentoController, DepoimentoHomeController],
  providers: [DepoimentoService],
})
export class DepoimentoModule {}
