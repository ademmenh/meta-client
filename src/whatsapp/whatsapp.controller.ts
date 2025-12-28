import { Controller, Post, Param, Body } from '@nestjs/common';
import { ApiDto } from '../common/api/decorators/api.dto.decorator';
import { RBody } from '../common/api/decorators/response-transform.decorator';
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
    @ApiDto({ type: WhatsAppMessageResponseDto })
    @RBody({ dto: WhatsAppMessageResponseDto })
    async sendText(
        @Param('phoneNumberId') phoneNumberId: string,
        @Body() dto: SendTextMessageDto,
    ): Promise<WhatsAppMessageResponseDto> {
        return this.whatsappService.sendText(phoneNumberId, dto);
    }

    @Post(':phoneNumberId/messages/template')
    @ApiDto({ type: WhatsAppMessageResponseDto })
    @RBody({ dto: WhatsAppMessageResponseDto })
    async sendTemplate(
        @Param('phoneNumberId') phoneNumberId: string,
        @Body() dto: SendTemplateMessageDto,
    ): Promise<WhatsAppMessageResponseDto> {
        return this.whatsappService.sendTemplate(phoneNumberId, dto);
    }

    @Post(':phoneNumberId/messages/media')
    @ApiDto({ type: WhatsAppMessageResponseDto })
    @RBody({ dto: WhatsAppMessageResponseDto })
    async sendMedia(
        @Param('phoneNumberId') phoneNumberId: string,
        @Body() dto: SendMediaMessageDto,
    ): Promise<WhatsAppMessageResponseDto> {
        return this.whatsappService.sendMedia(phoneNumberId, dto);
    }
}
