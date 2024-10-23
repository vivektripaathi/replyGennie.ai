import { Module } from '@nestjs/common';
import { EmailService } from './email.service';
import { BullModule } from '@nestjs/bull';
import { EmailProcessor } from './email.processor';
import { OpenaiService } from '../openai/openai.service'; // Update this if necessary based on your project structure

@Module({
    imports: [
        BullModule.registerQueue({
            name: 'emailQueue',
        }),
    ],
    providers: [EmailService, EmailProcessor, OpenaiService],
    exports: [EmailService],
})
export class EmailModule {}
