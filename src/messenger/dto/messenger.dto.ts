import { IsString, IsEnum, IsOptional, IsUrl } from 'class-validator';
import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

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
    @ApiProperty({ example: '1234567890' })
    id: string;
}

export class SendTextMessageDto {
    @IsString()
    @ApiProperty({ example: '1234567890' })
    recipient_id: string;

    @IsString()
    @ApiProperty({ example: 'Hello from Meta Client!' })
    text: string;

    @IsOptional()
    @IsEnum(MessagingType)
    @ApiProperty({ enum: MessagingType, example: MessagingType.RESPONSE, required: false })
    messaging_type?: MessagingType;
}

export class SendAttachmentMessageDto {
    @IsString()
    @ApiProperty({ example: '1234567890' })
    recipient_id: string;

    @IsEnum(AttachmentType)
    @ApiProperty({ enum: AttachmentType, example: AttachmentType.IMAGE })
    type: AttachmentType;

    @IsUrl()
    @ApiProperty({ example: 'https://example.com/image.jpg' })
    url: string;

    @IsOptional()
    @IsEnum(MessagingType)
    @ApiProperty({ enum: MessagingType, example: MessagingType.RESPONSE, required: false })
    messaging_type?: MessagingType;
}

export class MessageResponseDto {
    @Expose()
    @ApiProperty({ example: '1234567890' })
    recipient_id: string;

    @Expose()
    @ApiProperty({ example: 'mid.1234567890:1234567890' })
    message_id: string;
}

export class SendMessageResponseDto {
    @Expose()
    @ApiProperty({ example: '1234567890' })
    recipient_id: string;

    @Expose()
    @ApiProperty({ example: 'mid.1234567890:1234567890' })
    message_id: string;
}
