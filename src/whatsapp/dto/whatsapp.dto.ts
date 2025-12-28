import { IsString, IsEnum, IsOptional, IsArray, ValidateNested } from 'class-validator';
import { Type, Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export enum MediaType {
    IMAGE = 'image',
    DOCUMENT = 'document',
    AUDIO = 'audio',
    VIDEO = 'video',
    STICKER = 'sticker',
}

export class SendTextMessageDto {
    @IsString()
    @ApiProperty({ example: '1234567890' })
    to: string;

    @IsString()
    @ApiProperty({ example: 'Hello from WhatsApp!' })
    text: string;

    @IsOptional()
    @IsString()
    @ApiProperty({ example: false, required: false })
    preview_url?: boolean;
}

export class TemplateComponentParameterDto {
    @IsString()
    @ApiProperty({ example: 'text' })
    type: string;

    @IsOptional()
    @IsString()
    @ApiProperty({ example: 'John Doe', required: false })
    text?: string;

    @IsOptional()
    @ApiProperty({ required: false })
    image?: { link: string };

    @IsOptional()
    @ApiProperty({ required: false })
    document?: { link: string };

    @IsOptional()
    @ApiProperty({ required: false })
    video?: { link: string };
}

export class TemplateComponentDto {
    @IsString()
    @ApiProperty({ example: 'body' })
    type: string;

    @IsOptional()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => TemplateComponentParameterDto)
    @ApiProperty({ type: [TemplateComponentParameterDto], required: false })
    parameters?: TemplateComponentParameterDto[];
}

export class TemplateLanguageDto {
    @IsString()
    @ApiProperty({ example: 'en_US' })
    code: string;
}

export class SendTemplateMessageDto {
    @IsString()
    @ApiProperty({ example: '1234567890' })
    to: string;

    @IsString()
    @ApiProperty({ example: 'hello_world' })
    template_name: string;

    @ValidateNested()
    @Type(() => TemplateLanguageDto)
    @ApiProperty({ type: TemplateLanguageDto })
    language: TemplateLanguageDto;

    @IsOptional()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => TemplateComponentDto)
    @ApiProperty({ type: [TemplateComponentDto], required: false })
    components?: TemplateComponentDto[];
}

export class SendMediaMessageDto {
    @IsString()
    @ApiProperty({ example: '1234567890' })
    to: string;

    @IsEnum(MediaType)
    @ApiProperty({ enum: MediaType, example: MediaType.IMAGE })
    type: MediaType;

    @IsOptional()
    @IsString()
    @ApiProperty({ example: '123456789012345', required: false })
    media_id?: string;

    @IsOptional()
    @IsString()
    @ApiProperty({ example: 'https://example.com/img.jpg', required: false })
    link?: string;

    @IsOptional()
    @IsString()
    @ApiProperty({ example: 'Check this out!', required: false })
    caption?: string;

    @IsOptional()
    @IsString()
    @ApiProperty({ example: 'file.pdf', required: false })
    filename?: string;
}

export class MessageContactDto {
    @Expose()
    @ApiProperty({ example: '1234567890' })
    input: string;

    @Expose()
    @ApiProperty({ example: '1234567890' })
    wa_id: string;
}

export class MessageIdDto {
    @Expose()
    @ApiProperty({ example: 'wamid.HBgLMTIzNDU2Nzg5MEIPAhgUM0EzRDRCNUM2RDdFOUYwRjE4QkMA' })
    id: string;
}

export class WhatsAppMessageResponseDto {
    @Expose()
    @ApiProperty({ example: 'whatsapp' })
    messaging_product: string;

    @Expose()
    @ApiProperty({ type: [MessageContactDto] })
    contacts: MessageContactDto[];

    @Expose()
    @ApiProperty({ type: [MessageIdDto] })
    messages: MessageIdDto[];
}
