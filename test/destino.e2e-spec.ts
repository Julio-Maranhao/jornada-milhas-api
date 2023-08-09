/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import { v4 as uuid } from 'uuid';
import { DestinoRepository } from '../src/destinos/repositories/destino.repository';
import { DestinosModule } from '../src/destinos/destinos.module';
import { Destino } from '../src/destinos/entities/destino.entity';

config();

const configService = new ConfigService();

const id = uuid();

describe('DestinoController (e2e)', () => {
  let app: INestApplication;
  let destinoRepository: DestinoRepository;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        DestinosModule,
        TypeOrmModule.forRoot({
          type: 'postgres',
          host: configService.get<string>('DB_HOST'),
          port: configService.get<number>('DB_PORT'),
          username: configService.get<string>('DB_USERNAME'),
          password: configService.get<string>('DB_PASSWORD'),
          database: configService.get<string>('DB_NAME'),
          entities: [Destino],
          synchronize: false,
        }),
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
    destinoRepository = moduleFixture.get<DestinoRepository>(DestinoRepository);
  });

  afterAll(async () => {
    // await destinoRepository.query(`DELETE FROM destinos WHERE id="${id}"`);
    await app.close();
  });

  it('/destinos (GET)', () => {
    return request(app.getHttpServer()).get('/destinos').expect(200);
  });

  it('/destinos (POST)', () => {
    return request(app.getHttpServer())
      .post('/destinos')
      .send({
        id: id,
        foto1: 'foto 1',
        foto2: 'foto 2',
        meta: 'meta 1',
        nome: 'teste',
        textoDescritivo: 'texto 1',
        preco: 12.99,
      })
      .expect(201);
  });

  it('/destinos/:id (GET)', () => {
    return request(app.getHttpServer()).get(`/destinos/${id}`).expect(200);
  });

  it('destinos/:id (PUT)', () => {
    return request(app.getHttpServer())
      .put(`/destinos/${id}`)
      .send({ meta: 'meta atualizada' })
      .expect(200);
  });

  it('destinos/:id (DELETE)', () => {
    return request(app.getHttpServer()).del(`/destinos/${id}`).expect(200);
  });
});
