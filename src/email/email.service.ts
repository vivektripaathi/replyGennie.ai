import { InjectQueue } from '@nestjs/bull';
import { Injectable, Logger } from '@nestjs/common';
import { Queue } from 'bull';
import { google } from 'googleapis';
import { OpenaiService } from 'src/openai/openai.service';

@Injectable()
export class EmailService {
    private readonly logger = new Logger(EmailService.name);
    private gmailClient;

    constructor(
        @InjectQueue('emailQueue') private emailQueue: Queue,
        private readonly openaiService: OpenaiService
    ) {}

    initializeGmailClient(accessToken: string) {
        const oauth2Client = new google.auth.OAuth2();
        oauth2Client.setCredentials({ access_token: accessToken });
        this.gmailClient = google.gmail({
            version: 'v1',
            auth: oauth2Client,
        });
    }

    async checkUnreadEmails() {
        try {
            if (!this.gmailClient) return;

            const res = await this.gmailClient.users.messages.list({
                userId: 'me',
                q: 'is:unread',
            });

            const messages = res.data.messages || [];
            for (const message of messages) {
                // enqueue for processing
            }
        } catch (error) {
            this.logger.error('Error checking unread emails:', error.message);
        }
    }

}
