import { IsString, IsEnum, IsOptional, IsUrl } from 'class-validator';

export enum AttachmentType {
    IMAGE = 'image',
    AUDIO = 'audio',
    VIDEO = 'video',
    FILE = 'file',
}

export enum MessagingType {
    RESPONSE = 'RESPONSE',
    UPDATE = 'UPDATE',
    MESSAGE_TAG = 'MESSAGE_TAG',
}

export class RecipientDto {
    @IsString()
    id: string;
}

export class SendTextMessageDto {
    @IsString()
    recipient_id: string;

    @IsString()
    text: string;

    @IsOptional()
    @IsEnum(MessagingType)
    messaging_type?: MessagingType;
}

export class SendAttachmentMessageDto {
    @IsString()
    recipient_id: string;

    @IsEnum(AttachmentType)
    type: AttachmentType;

    @IsUrl()
    url: string;

    @IsOptional()
    @IsEnum(MessagingType)
    messaging_type?: MessagingType;
}

export class MessageResponseDto {
    recipient_id: string;
    message_id: string;
}

export class SendMessageResponseDto {
    recipient_id: string;
    message_id: string;
}
