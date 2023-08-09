/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DepoimentoModule } from '../src/depoimento/depoimento.module';
import { Depoimento } from '../src/depoimento/entities/depoimento.entity';
import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import { v4 as uuid } from 'uuid';
import { DepoimentoRepository } from '../src/depoimento/repositories/depoimento.repository';

config();

const configService = new ConfigService();

const id = uuid();

describe('DepoimentoController (e2e)', () => {
  let app: INestApplication;
  let depoimentoRepository: DepoimentoRepository;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        DepoimentoModule,
        TypeOrmModule.forRoot({
          type: 'postgres',
          host: configService.get<string>('DB_HOST'),
          port: configService.get<number>('DB_PORT'),
          username: configService.get<string>('DB_USERNAME'),
          password: configService.get<string>('DB_PASSWORD'),
          database: configService.get<string>('DB_NAME'),
          entities: [Depoimento],
          synchronize: false,
        }),
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
    depoimentoRepository =
      moduleFixture.get<DepoimentoRepository>(DepoimentoRepository);
  });

  afterAll(async () => {
    // USE IF NOT REALLY DELETE CREATED ROWS
    // await depoimentoRepository.query(
    //   `DELETE FROM depoimentos WHERE id="${id}"`,
    // );
    await app.close();
  });

  it('/depoimentos (GET)', () => {
    return request(app.getHttpServer()).get('/depoimentos').expect(200);
  });

  it('/depoimentos (POST)', () => {
    return request(app.getHttpServer())
      .post('/depoimentos')
      .send({
        id: id,
        foto: 'foto 1',
        depoimento: 'depoimento 1',
        username: 'teste',
      })
      .expect(201);
  });

  it('/depoimentos/:id (GET)', () => {
    return request(app.getHttpServer()).get(`/depoimentos/${id}`).expect(200);
  });

  it('depoimentos/:id (PUT)', () => {
    return request(app.getHttpServer())
      .put(`/depoimentos/${id}`)
      .send({ depoimento: 'depoimento atualizado' })
      .expect(200);
  });

  it('depoimentos/:id (DELETE)', () => {
    return request(app.getHttpServer()).del(`/depoimentos/${id}`).expect(200);
  });
});
