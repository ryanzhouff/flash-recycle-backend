import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setupSwagger } from './setup-swagger';
import { ConfigService } from '@nestjs/config';
import { ConfigKeyPaths, IAppConfig } from './config';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService<ConfigKeyPaths>);
  const { port } = configService.get<IAppConfig>('app');
  const logger = new Logger('NestApplication');

  setupSwagger(app, configService);

  const shutdown = async () => {
    logger.log('🧹 正在清理资源...');
    logger.log('⏳ Gracefully shutting down...');
    await app.close();
    logger.log('❌ Server closed');
    // 强制退出超时（防止卡死）可选
    // setTimeout(() => {
    //   process.exit(1);
    // }, 10_000);
  };

  process.on('SIGTERM', shutdown);
  process.on('SIGINT', shutdown);

  await app.listen(port);
}

bootstrap();
