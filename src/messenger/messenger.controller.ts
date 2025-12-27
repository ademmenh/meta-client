import { Controller, Post, Param, Body } from '@nestjs/common';
import { MessengerService } from './messenger.service';
import {
    SendTextMessageDto,
    SendAttachmentMessageDto,
    SendMessageResponseDto,
} from './dto/messenger.dto';

@Controller('messenger')
export class MessengerController {
    constructor(private readonly messengerService: MessengerService) { }

    @Post(':pageId/messages')
    async sendTextMessage(
        @Param('pageId') pageId: string,
        @Body() dto: SendTextMessageDto,
    ): Promise<SendMessageResponseDto> {
        return this.messengerService.sendTextMessage(pageId, dto);
    }

    @Post(':pageId/messages/attachment')
    async sendAttachment(
        @Param('pageId') pageId: string,
        @Body() dto: SendAttachmentMessageDto,
    ): Promise<SendMessageResponseDto> {
        return this.messengerService.sendAttachment(pageId, dto);
    }
}
