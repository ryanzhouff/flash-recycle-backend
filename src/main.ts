import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setupSwagger } from './setup-swagger';
import { ConfigService } from '@nestjs/config';
import { ConfigKeyPaths, IAppConfig } from './config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService<ConfigKeyPaths>);
  const { port } = configService.get<IAppConfig>('app');

  setupSwagger(app, configService);

  app.enableShutdownHooks();

  await app.listen(port);
}

bootstrap();
