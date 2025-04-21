import { ConfigType, registerAs } from '@nestjs/config';
import { env, envNumber } from 'src/global/env';

export const appRegisterToken = 'app';

const globalPrefix = env('GLOBAL_PREFIX', 'docs');

export const AppConfig = registerAs(appRegisterToken, () => ({
  name: env('APP_NAME'),
  port: envNumber('APP_PORT', 3000),
  baseUrl: env('APP_BASE_URL'),
  globalPrefix,
}));

export type IAppConfig = ConfigType<typeof AppConfig>;
