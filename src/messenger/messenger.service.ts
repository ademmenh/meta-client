import { Injectable } from '@nestjs/common';
import { MetaClient } from '../meta/meta.client';
import {
    SendTextMessageDto,
    SendAttachmentMessageDto,
    SendMessageResponseDto,
    MessagingType,
} from './dto/messenger.dto';

@Injectable()
export class MessengerService {
    constructor(private readonly metaClient: MetaClient) { }

    async sendTextMessage(pageId: string, dto: SendTextMessageDto): Promise<SendMessageResponseDto> {
        const body = {
            recipient: { id: dto.recipient_id },
            messaging_type: dto.messaging_type || MessagingType.RESPONSE,
            message: { text: dto.text },
        };

        return this.metaClient.post<SendMessageResponseDto>(`/${pageId}/messages`, body);
    }

    async sendAttachment(pageId: string, dto: SendAttachmentMessageDto): Promise<SendMessageResponseDto> {
        const body = {
            recipient: { id: dto.recipient_id },
            messaging_type: dto.messaging_type || MessagingType.RESPONSE,
            message: {
                attachment: {
                    type: dto.type,
                    payload: { url: dto.url, is_reusable: true },
                },
            },
        };

        return this.metaClient.post<SendMessageResponseDto>(`/${pageId}/messages`, body);
    }
}
