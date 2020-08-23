import { NestFactory } from '@nestjs/core';
import 'reflect-metadata';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { TransformInterceptor } from './underscore-id-to-id-interceptor'

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  app.enableCors();

  app.useGlobalInterceptors(new TransformInterceptor());
  
  app.useGlobalPipes(new ValidationPipe({transform: true}));

  await app.listen(3000);
}
bootstrap();
