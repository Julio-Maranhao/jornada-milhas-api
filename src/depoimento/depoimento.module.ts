import { Module } from '@nestjs/common';
import { DepoimentoService } from './depoimento.service';
import { DepoimentoController } from './depoimento.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Depoimento } from './entities/depoimento.entity';
import { DepoimentoHomeController } from './depoimento-home.controller';
import { DepoimentoRepository } from './repositories/depoimento.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Depoimento])],
  controllers: [DepoimentoController, DepoimentoHomeController],
  providers: [DepoimentoService, DepoimentoRepository],
})
export class DepoimentoModule {}
