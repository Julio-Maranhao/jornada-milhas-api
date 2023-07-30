import { Module } from '@nestjs/common';
import { DestinosService } from './destinos.service';
import { DestinosController } from './destinos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Destino } from './entities/destino.entity';
import { DestinoRepository } from './repositories/destino.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Destino])],
  controllers: [DestinosController],
  providers: [DestinosService, DestinoRepository],
})
export class DestinosModule {}
