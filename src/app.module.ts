import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DepoimentoModule } from './depoimento/depoimento.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostgresConfigService } from './config/db.config.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    DepoimentoModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      useClass: PostgresConfigService,
      inject: [PostgresConfigService],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
