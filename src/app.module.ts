import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { EmailModule } from './email/email.module';
import { OpenaiModule } from './openai/openai.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    AuthModule,
    EmailModule,
    OpenaiModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
