import { Module } from '@nestjs/common';
import { DepoimentoModule } from './depoimento/depoimento.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostgresConfigService } from './config/db.config.service';
import { ConfigModule } from '@nestjs/config';
import { DestinosModule } from './destinos/destinos.module';

@Module({
  imports: [
    DepoimentoModule,
    DestinosModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      useClass: PostgresConfigService,
      inject: [PostgresConfigService],
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
