import { IsString, IsEnum, IsOptional, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export enum MediaType {
    IMAGE = 'image',
    DOCUMENT = 'document',
    AUDIO = 'audio',
    VIDEO = 'video',
    STICKER = 'sticker',
}

export class SendTextMessageDto {
    @IsString()
    to: string;

    @IsString()
    text: string;

    @IsOptional()
    @IsString()
    preview_url?: boolean;
}

export class TemplateComponentParameterDto {
    @IsString()
    type: string;

    @IsOptional()
    @IsString()
    text?: string;

    @IsOptional()
    image?: { link: string };

    @IsOptional()
    document?: { link: string };

    @IsOptional()
    video?: { link: string };
}

export class TemplateComponentDto {
    @IsString()
    type: string;

    @IsOptional()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => TemplateComponentParameterDto)
    parameters?: TemplateComponentParameterDto[];
}

export class TemplateLanguageDto {
    @IsString()
    code: string;
}

export class SendTemplateMessageDto {
    @IsString()
    to: string;

    @IsString()
    template_name: string;

    @ValidateNested()
    @Type(() => TemplateLanguageDto)
    language: TemplateLanguageDto;

    @IsOptional()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => TemplateComponentDto)
    components?: TemplateComponentDto[];
}

export class SendMediaMessageDto {
    @IsString()
    to: string;

    @IsEnum(MediaType)
    type: MediaType;

    @IsOptional()
    @IsString()
    media_id?: string;

    @IsOptional()
    @IsString()
    link?: string;

    @IsOptional()
    @IsString()
    caption?: string;

    @IsOptional()
    @IsString()
    filename?: string;
}

export class MessageContactDto {
    input: string;
    wa_id: string;
}

export class MessageIdDto {
    id: string;
}

export class WhatsAppMessageResponseDto {
    messaging_product: string;
    contacts: MessageContactDto[];
    messages: MessageIdDto[];
}
