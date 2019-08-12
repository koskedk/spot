import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SeederModule } from './infrastructure/seeder.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  const seeder = app.get(SeederModule);
  await seeder.seedData();
  await app.listen(3002);
}

bootstrap();
