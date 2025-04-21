import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env.local', `.env.${process.env.NODE_ENV || 'devlopment'}`, '.env'],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
