import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { GoogleStrategy } from './strategies/google.strategy';
import { OutlookStrategy } from './strategies/outlook.strategy';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [PassportModule, ConfigModule],
  controllers: [AuthController],
  providers: [GoogleStrategy, OutlookStrategy],
})
export class AuthModule {}
