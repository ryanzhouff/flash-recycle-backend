import { ConfigType, registerAs } from '@nestjs/config';
import { env, envBoolean } from '../global/env';

export const swaggerRegisterToken = 'swagger';

export const SwaggerConfig = registerAs(swaggerRegisterToken, () => ({
  enable: envBoolean('SWAGGER_ENABLE'),
  path: env('SWAGGER_PATH'),
  serverUrl: env('SWAGGER_SERVER_URL', env('APP_BASE_URL')),
  version: env('SWAGGER_VERSION', '1.0'),
}));

export type ISwaggerConfig = ConfigType<typeof SwaggerConfig>;
