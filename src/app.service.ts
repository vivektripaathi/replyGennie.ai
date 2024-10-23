import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return `<p><a href="/auth/google" role="button"> Continue with Google </a></p> 
        <p><a href="/auth/outlook" role="button"> Continue with Outlook </a></p>`;
  }
}
