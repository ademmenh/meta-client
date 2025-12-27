import { IsArray, IsString, ArrayNotEmpty } from 'class-validator';

export class SubscribeWebhookDto {
    @IsArray()
    @ArrayNotEmpty()
    @IsString({ each: true })
    subscribed_fields: string[];
}

export class WebhookSubscriptionResponseDto {
    success: boolean;
}
