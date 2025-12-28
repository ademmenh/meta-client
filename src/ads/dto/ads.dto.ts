import { IsString, IsOptional, IsEnum, IsNumber } from 'class-validator';
import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export enum CampaignStatus {
    ACTIVE = 'ACTIVE',
    PAUSED = 'PAUSED',
    DELETED = 'DELETED',
    ARCHIVED = 'ARCHIVED',
}

export enum CampaignObjective {
    AWARENESS = 'AWARENESS',
    TRAFFIC = 'TRAFFIC',
    ENGAGEMENT = 'ENGAGEMENT',
    LEADS = 'LEADS',
    APP_PROMOTION = 'APP_PROMOTION',
    SALES = 'SALES',
}

export class AdAccountDto {
    @Expose()
    @ApiProperty({ example: '1234567890' })
    id: string;

    @Expose()
    @ApiProperty({ example: 'act_1234567890' })
    account_id: string;

    @Expose()
    @ApiProperty({ example: 'My Ad Account' })
    name: string;

    @Expose()
    @ApiProperty({ example: 1 })
    account_status: number;

    @Expose()
    @ApiProperty({ example: 'USD' })
    currency: string;

    @Expose()
    @ApiProperty({ example: 'America/Los_Angeles', required: false })
    timezone_name?: string;

    @Expose()
    @ApiProperty({ example: '100.50', required: false })
    amount_spent?: string;

    @Expose()
    @ApiProperty({ example: '50.25', required: false })
    balance?: string;
}

export class AdAccountListDto {
    @Expose()
    @ApiProperty({ type: [AdAccountDto] })
    data: AdAccountDto[];

    @Expose()
    @ApiProperty({ required: false })
    paging?: {
        cursors?: { before?: string; after?: string };
        next?: string;
        previous?: string;
    };
}

export class CampaignDto {
    @Expose()
    @ApiProperty({ example: '2384912345678' })
    id: string;

    @Expose()
    @ApiProperty({ example: 'Summmer Sale Campaign' })
    name: string;

    @Expose()
    @ApiProperty({ enum: CampaignStatus, example: CampaignStatus.ACTIVE })
    status: CampaignStatus;

    @Expose()
    @ApiProperty({ example: 'OUTDOOR_ADVERTISING', required: false })
    objective?: string;

    @Expose()
    @ApiProperty({ example: '2023-01-01T12:00:00+0000', required: false })
    created_time?: string;

    @Expose()
    @ApiProperty({ example: '2023-01-02T12:00:00+0000', required: false })
    updated_time?: string;

    @Expose()
    @ApiProperty({ example: '1000', required: false })
    daily_budget?: string;

    @Expose()
    @ApiProperty({ example: '5000', required: false })
    lifetime_budget?: string;
}

export class CampaignListDto {
    @Expose()
    @ApiProperty({ type: [CampaignDto] })
    data: CampaignDto[];

    @Expose()
    @ApiProperty({ required: false })
    paging?: {
        cursors?: { before?: string; after?: string };
        next?: string;
        previous?: string;
    };
}

export class CreateCampaignDto {
    @IsString()
    @ApiProperty({ example: 'New Campaign' })
    name: string;

    @IsEnum(CampaignObjective)
    @ApiProperty({ enum: CampaignObjective, example: CampaignObjective.ENGAGEMENT })
    objective: CampaignObjective;

    @IsOptional()
    @IsEnum(CampaignStatus)
    @ApiProperty({ enum: CampaignStatus, example: CampaignStatus.PAUSED, required: false })
    status?: CampaignStatus;

    @IsOptional()
    @IsNumber()
    @ApiProperty({ example: 1000, required: false })
    daily_budget?: number;

    @IsOptional()
    @IsNumber()
    @ApiProperty({ example: 5000, required: false })
    lifetime_budget?: number;

    @IsOptional()
    @IsString()
    @ApiProperty({ example: '[]', required: false })
    special_ad_categories?: string;
}

export class UpdateCampaignDto {
    @IsOptional()
    @IsString()
    @ApiProperty({ example: 'Updated Campaign Name', required: false })
    name?: string;

    @IsOptional()
    @IsEnum(CampaignStatus)
    @ApiProperty({ enum: CampaignStatus, example: CampaignStatus.ACTIVE, required: false })
    status?: CampaignStatus;

    @IsOptional()
    @IsNumber()
    @ApiProperty({ example: 1500, required: false })
    daily_budget?: number;

    @IsOptional()
    @IsNumber()
    @ApiProperty({ example: 6000, required: false })
    lifetime_budget?: number;
}

export class CreateCampaignResponseDto {
    @Expose()
    @ApiProperty({ example: '2384912345678' })
    id: string;
}

export class DeleteCampaignResponseDto {
    @Expose()
    @ApiProperty({ example: true })
    success: boolean;
}

export class AdDto {
    @Expose()
    @ApiProperty({ example: '2384912345679' })
    id: string;

    @Expose()
    @ApiProperty({ example: 'Summer Promo Ad 1' })
    name: string;

    @Expose()
    @ApiProperty({ example: 'ACTIVE' })
    status: string;

    @Expose()
    @ApiProperty({ required: false })
    creative?: {
        id: string;
    };

    @Expose()
    @ApiProperty({ example: '2023-01-01T12:00:00+0000', required: false })
    created_time?: string;

    @Expose()
    @ApiProperty({ example: '2023-01-02T12:00:00+0000', required: false })
    updated_time?: string;
}

export class AdListDto {
    @Expose()
    @ApiProperty({ type: [AdDto] })
    data: AdDto[];

    @Expose()
    @ApiProperty({ required: false })
    paging?: {
        cursors?: { before?: string; after?: string };
        next?: string;
        previous?: string;
    };
}

export class InsightValueDto {
    @Expose()
    @ApiProperty({ example: '2023-01-01' })
    date_start: string;

    @Expose()
    @ApiProperty({ example: '2023-01-31' })
    date_stop: string;

    @Expose()
    @ApiProperty({ example: '1000', required: false })
    impressions?: string;

    @Expose()
    @ApiProperty({ example: '800', required: false })
    reach?: string;

    @Expose()
    @ApiProperty({ example: '50', required: false })
    clicks?: string;

    @Expose()
    @ApiProperty({ example: '10.50', required: false })
    spend?: string;

    @Expose()
    @ApiProperty({ example: '0.21', required: false })
    cpc?: string;

    @Expose()
    @ApiProperty({ example: '10.50', required: false })
    cpm?: string;

    @Expose()
    @ApiProperty({ example: '0.05', required: false })
    ctr?: string;
}

export class AdsInsightsResponseDto {
    @Expose()
    @ApiProperty({ type: [InsightValueDto] })
    data: InsightValueDto[];

    @Expose()
    @ApiProperty({ required: false })
    paging?: {
        cursors?: { before?: string; after?: string };
        next?: string;
        previous?: string;
    };
}

export class GetInsightsQueryDto {
    @IsOptional()
    @IsString()
    @ApiProperty({ example: 'last_30d', required: false })
    date_preset?: string;

    @IsOptional()
    @IsString()
    @ApiProperty({ example: '{"since":"2023-01-01","until":"2023-01-31"}', required: false })
    time_range?: string;

    @IsOptional()
    @IsString()
    @ApiProperty({ example: 'impressions,reach,clicks,spend', required: false })
    fields?: string;
}
