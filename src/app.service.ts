import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
    constructor(private readonly configService: ConfigService) { }

    getHealth(): { status: string; environment: string; timestamp: string } {
        return {
            status: 'ok',
            environment: this.configService.get<string>('environment') || 'unknown',
            timestamp: new Date().toISOString(),
        };
    }
}
