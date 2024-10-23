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
}
