import { SwaggerConfig, ISwaggerConfig, swaggerRegisterToken } from './swagger.config';
import { AppConfig, IAppConfig, appRegisterToken } from './app.config';

export * from './swagger.config';
export * from './app.config';

export interface AllConfigType {
  [swaggerRegisterToken]: ISwaggerConfig;
  [appRegisterToken]: IAppConfig;
}

export type ConfigKeyPaths = RecordNamePaths<AllConfigType>;

export default {
  SwaggerConfig,
  AppConfig,
};
