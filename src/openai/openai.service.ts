import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';

@Injectable()
export class OpenaiService {
    private openai: OpenAI;

    constructor() {
        this.openai = new OpenAI({
            apiKey: process.env.OPENAI_API_KEY, // Load your OpenAI API key from env
            baseURL: `https://api.cloudflare.com/client/v4/accounts/${process.env.CLOUDFLARE_ACCOUNT_ID}/ai/v1`
        });
    }

    async analyzeEmailContext(emailContent: string): Promise<string> {
        const response = await this.openai.chat.completions.create({
            model: "@cf/meta/llama-3.1-8b-instruct",
            messages: [
                {role: 'system', content: 'Analyze the following email and give a summary',},
                { role: 'user', content: emailContent }
            ],
            max_tokens: 150,
        });
        return response.choices[0].message.content.trim();
    }

    async categorizeEmailContent(emailContent: string): Promise<string> {
        const response = await this.openai.chat.completions.create({
            model: "@cf/meta/llama-3.1-8b-instruct",
            messages: [
                {role: 'system', content: 'Categorize this email content into one of the following categories: 1. Interested, 2. Not Interested, 3.More information. please answer in Interested, Not Interested, More information words only dont include number',},
                {role: 'user', content: emailContent }
            ],
            max_tokens: 20,
        });
        return response.choices[0].message.content.trim();
    }

    async generateEmailReply(emailContent: string): Promise<string> {
        const response = await this.openai.chat.completions.create({
            model: "@cf/meta/llama-3.1-8b-instruct",
            messages: [
                {role: 'system', content: 'Generate an appropriate reply for the following email content ans return reply message only',},
                { role: 'user', content: emailContent }
            ],
            max_tokens: 150,
        });
        return response.choices[0].message.content.trim();
    }
}
