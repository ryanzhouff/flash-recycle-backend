import { INestApplication } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigKeyPaths, IAppConfig, ISwaggerConfig } from './config';

export function setupSwagger(app: INestApplication, configService: ConfigService<ConfigKeyPaths>) {
  const { path, version, serverUrl } = configService.get<ISwaggerConfig>('swagger');
  const { name, globalPrefix } = configService.get<IAppConfig>('app');

  const config = new DocumentBuilder()
    .setTitle(name)
    .setDescription('后台管理系统 API 文档')
    .setVersion(version)
    .addServer(`${serverUrl}/${globalPrefix}`, 'Base Url')
    .build();

  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(path, app, documentFactory);
}
