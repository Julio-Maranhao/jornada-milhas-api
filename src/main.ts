import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { useContainer } from 'class-validator';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // USE TO ENABLE VALIDATION PIPES
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  // USE TO ENABLE CORS
  app.enableCors();

  // ADD TO USE CUSTOM VALIDATORS
  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  // SWAGGER
  const config = new DocumentBuilder()
    .setTitle('Jornada Milhas API')
    .setDescription('Api do Allura Challenge Back-End Jornada Milhas.')
    .setVersion('0.0.1')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/', app, document);

  await app.listen(3000);
}
bootstrap();
