import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { Strategy } from 'passport-outlook';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class OutlookStrategy extends PassportStrategy(Strategy, 'outlook') {
    constructor(private readonly configService: ConfigService) {
        super({
            clientID: configService.get('OUTLOOK_CLIENT_ID'),
            clientSecret: configService.get('OUTLOOK_CLIENT_SECRET'),
            callbackURL: configService.get('OUTLOOK_REDIRECT_URL'),
            scope: [
                'openid',
                'profile',
                'offline_access',
                'Mail.Read',
                'Mail.Send',
                'User.Read',
            ],
            responseType: 'code',
            passReqToCallback: true,
        });
    }

    async validate(accessToken: string, refreshToken: string,profile: any, callback: Function,) {
        try {
            return callback(null, {
                accessToken,
                refreshToken,
                ...profile,
            });
        } catch (error) {
            console.error('Error during Outlook OAuth validation:', error);
            return callback(error, false);
        }
    }
}
