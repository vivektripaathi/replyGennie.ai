import { Processor, Process } from '@nestjs/bull';
import { Job } from 'bullmq';
import { EmailService } from './email.service';
import { Logger } from '@nestjs/common';

@Processor('emailQueue')
export class EmailProcessor {
    private readonly logger = new Logger(EmailService.name);
    constructor(private emailService: EmailService) {}


    @Process('checkUnreadEmails')
    async handleCheckUnreadEmails(job: Job) {
        await this.emailService.checkUnreadEmails();
    }

    @Process('processEmail')
    async handleProcessEmail(job: Job) {
        const { messageId } = job.data;
        this.logger.log(`Processing email: ${messageId}`);
        const emailData = await this.emailService.getEmailData(messageId);
        if (emailData) {
            await this.emailService.processIncomingEmail(messageId, emailData);
        }
    }
}
