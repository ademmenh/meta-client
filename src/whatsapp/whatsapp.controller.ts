import { Controller, Post, Param, Body } from '@nestjs/common';
import { WhatsappService } from './whatsapp.service';
import {
    SendTextMessageDto,
    SendTemplateMessageDto,
    SendMediaMessageDto,
    WhatsAppMessageResponseDto,
} from './dto/whatsapp.dto';

@Controller('whatsapp')
export class WhatsappController {
    constructor(private readonly whatsappService: WhatsappService) { }

    @Post(':phoneNumberId/messages/text')
    async sendText(
        @Param('phoneNumberId') phoneNumberId: string,
        @Body() dto: SendTextMessageDto,
    ): Promise<WhatsAppMessageResponseDto> {
        return this.whatsappService.sendText(phoneNumberId, dto);
    }

    @Post(':phoneNumberId/messages/template')
    async sendTemplate(
        @Param('phoneNumberId') phoneNumberId: string,
        @Body() dto: SendTemplateMessageDto,
    ): Promise<WhatsAppMessageResponseDto> {
        return this.whatsappService.sendTemplate(phoneNumberId, dto);
    }

    @Post(':phoneNumberId/messages/media')
    async sendMedia(
        @Param('phoneNumberId') phoneNumberId: string,
        @Body() dto: SendMediaMessageDto,
    ): Promise<WhatsAppMessageResponseDto> {
        return this.whatsappService.sendMedia(phoneNumberId, dto);
    }
}
