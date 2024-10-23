import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';

interface Request {
    user?: any;
}

@Controller('auth')
export class AuthController {

    @Get('google')
    @UseGuards(AuthGuard('google'))
    async googleAuth() { }

    @Get('google/callback')
    @UseGuards(AuthGuard('google'))
    async googleAuthCallback(@Req() req: Request, @Res() res: Response) {
        const user = req.user;
        console.log('Google user info:', user);

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
