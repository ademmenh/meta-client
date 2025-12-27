import { Injectable } from '@nestjs/common';
import { MetaClient } from '../meta/meta.client';
import {
    SendTextMessageDto,
    SendTemplateMessageDto,
    SendMediaMessageDto,
    WhatsAppMessageResponseDto,
} from './dto/whatsapp.dto';

@Injectable()
export class WhatsappService {
    constructor(private readonly metaClient: MetaClient) { }

    async sendText(phoneNumberId: string, dto: SendTextMessageDto): Promise<WhatsAppMessageResponseDto> {
        const body = {
            messaging_product: 'whatsapp',
            recipient_type: 'individual',
            to: dto.to,
            type: 'text',
            text: {
                preview_url: dto.preview_url || false,
                body: dto.text,
            },
        };

        return this.metaClient.post<WhatsAppMessageResponseDto>(`/${phoneNumberId}/messages`, body);
    }

    async sendTemplate(phoneNumberId: string, dto: SendTemplateMessageDto): Promise<WhatsAppMessageResponseDto> {
        const body = {
            messaging_product: 'whatsapp',
            recipient_type: 'individual',
            to: dto.to,
            type: 'template',
            template: {
                name: dto.template_name,
                language: dto.language,
                components: dto.components || [],
            },
        };

        return this.metaClient.post<WhatsAppMessageResponseDto>(`/${phoneNumberId}/messages`, body);
    }

    async sendMedia(phoneNumberId: string, dto: SendMediaMessageDto): Promise<WhatsAppMessageResponseDto> {
        const mediaPayload: Record<string, unknown> = {};

        if (dto.media_id) {
            mediaPayload.id = dto.media_id;
        } else if (dto.link) {
            mediaPayload.link = dto.link;
        }

        if (dto.caption) mediaPayload.caption = dto.caption;
        if (dto.filename) mediaPayload.filename = dto.filename;

        const body = {
            messaging_product: 'whatsapp',
            recipient_type: 'individual',
            to: dto.to,
            type: dto.type,
            [dto.type]: mediaPayload,
        };

        return this.metaClient.post<WhatsAppMessageResponseDto>(`/${phoneNumberId}/messages`, body);
    }
}
