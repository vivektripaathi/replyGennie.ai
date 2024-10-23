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


    async getEmailData(messageId: string) {
        try {
            const res = await this.gmailClient.users.messages.get({
                userId: 'me',
                id: messageId,
            });

            const email = res.data;
            const headers = email.payload.headers;
            const subject = headers.find(header => header.name === 'Subject')?.value || 'No Subject';
            const from = headers.find(header => header.name === 'From')?.value || '';
            const to = headers.find(header => header.name === 'To')?.value || '';
            const emailContent = email.snippet || '';

            return { from, to, subject, emailContent };
        } catch (error) {
            this.logger.error(`Error fetching email data for message ID ${messageId}:`, error.message);
            return null;
        }
    }


    private async sendReplyEmail(messageId: string, emailData: { from: string; to: string, subject: string; text: string }) {
        try {
            const { from, to, subject, text } = emailData;

            const message = this.createReplyMessage(to, from, subject, text, messageId);

            const res = await this.gmailClient.users.messages.send({
                userId: 'me',
                requestBody: {
                    raw: message,
                },
            });

            this.logger.log(`Reply sent to: ${from}, message ID: ${res.data.id}`);
        } catch (error) {
            this.logger.error(`Error sending reply email:`, error.message);
        }
    }


    private createReplyMessage(from: string, to: string, subject: string, text: string, messageId: string): string {
        const messageParts = [
            `From: ${from}`,
            `To: ${to}`,
            `Subject: Re: ${subject}`,
            `In-Reply-To: ${messageId}`,
            `References: ${messageId}`,
            '',
            text,
        ];
    
        const message = messageParts.join('\n');
        const encodedMessage = Buffer.from(message).toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
        return encodedMessage;
    }


    private async markEmailAsRead(messageId: string) {
        try {
            await this.gmailClient.users.messages.modify({
                userId: 'me',
                id: messageId,
                requestBody: {
                    removeLabelIds: ['UNREAD'], // Removes the "UNREAD" label
                },
            });
            this.logger.log(`Email marked as read: ${messageId}`);
        } catch (error) {
            this.logger.error(`Error marking email as read for message ID ${messageId}:`, error.message);
        }
    }

}
