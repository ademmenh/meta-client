import { IsArray, IsString, ArrayNotEmpty } from 'class-validator';
import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class SubscribeWebhookDto {
    @IsArray()
    @ArrayNotEmpty()
    @IsString({ each: true })
    @ApiProperty({ example: ['feed', 'messages'], type: [String] })
    subscribed_fields: string[];
}

export class WebhookSubscriptionResponseDto {
    @Expose()
    @ApiProperty({ example: true })
    success: boolean;
}
