import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { VersioningType } from '@nestjs/common';

// TODO: Implement cache with Redis https://www.tomray.dev/nestjs-caching-redis
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('/api');
  app.enableVersioning({
    defaultVersion: '1',
    type: VersioningType.URI,
  });

  app.enableCors({
    origin: '*',
  });

  const PORT = process.env.PORT || 3333;
  await app.listen(PORT);
}
bootstrap();
