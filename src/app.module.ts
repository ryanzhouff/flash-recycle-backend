import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import config from './config';
import { TransfromInterceptor } from './common/interceptors/transfrom/transfrom.interceptor';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { GlobalExceptionFilter } from './common/filters/global-exception/global-exception.filter';
//import { GracefulShutdownService } from './graceful-shutdown/graceful-shutdown.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env.local', `.env.${process.env.NODE_ENV || 'devlopment'}`, '.env'],
      load: Object.values(config),
    }),
  ],
  controllers: [AppController],
  providers: [
    { provide: APP_FILTER, useClass: GlobalExceptionFilter },
    AppService,
    { provide: APP_INTERCEPTOR, useClass: TransfromInterceptor },
  ],
})
export class AppModule {}
