import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import config from './config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env.local', `.env.${process.env.NODE_ENV || 'devlopment'}`, '.env'],
      load: Object.values(config),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
