import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';
import { EmailService } from 'src/email/email.service';

interface Request {
    user?: any;
}

@Controller('auth')
export class AuthController {
    constructor(private emailService: EmailService) {}

    @Get('google')
    @UseGuards(AuthGuard('google'))
    async googleAuth() { }

    @Get('google/callback')
    @UseGuards(AuthGuard('google'))
    async googleAuthCallback(@Req() req: Request, @Res() res: Response) {
        const user = req.user;
        console.log('Google user info:', user);

        const accessToken = req.user.accessToken;
        this.emailService.initializeGmailClient(accessToken);

        res.redirect('/');
    }

    @Get('outlook')
    @UseGuards(AuthGuard('outlook'))
    async outlookAuth() { }

    @Get('outlook/callback')
    @UseGuards(AuthGuard('outlook'))
    async outlookAuthCallback(@Req() req: Request, @Res() res: Response) {
        const user = req.user;
        console.log('Outlook user info:', user);
        res.redirect('/');
    }
}
