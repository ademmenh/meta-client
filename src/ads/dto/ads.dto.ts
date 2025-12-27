import { IsString, IsOptional, IsEnum, IsNumber } from 'class-validator';

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
    id: string;
    account_id: string;
    name: string;
    account_status: number;
    currency: string;
    timezone_name?: string;
    amount_spent?: string;
    balance?: string;
}

export class AdAccountListDto {
    data: AdAccountDto[];
    paging?: {
        cursors?: { before?: string; after?: string };
        next?: string;
        previous?: string;
    };
}

export class CampaignDto {
    id: string;
    name: string;
    status: CampaignStatus;
    objective?: string;
    created_time?: string;
    updated_time?: string;
    daily_budget?: string;
    lifetime_budget?: string;
}

export class CampaignListDto {
    data: CampaignDto[];
    paging?: {
        cursors?: { before?: string; after?: string };
        next?: string;
        previous?: string;
    };
}

export class CreateCampaignDto {
    @IsString()
    name: string;

    @IsEnum(CampaignObjective)
    objective: CampaignObjective;

    @IsOptional()
    @IsEnum(CampaignStatus)
    status?: CampaignStatus;

    @IsOptional()
    @IsNumber()
    daily_budget?: number;

    @IsOptional()
    @IsNumber()
    lifetime_budget?: number;

    @IsOptional()
    @IsString()
    special_ad_categories?: string;
}

export class UpdateCampaignDto {
    @IsOptional()
    @IsString()
    name?: string;

    @IsOptional()
    @IsEnum(CampaignStatus)
    status?: CampaignStatus;

    @IsOptional()
    @IsNumber()
    daily_budget?: number;

    @IsOptional()
    @IsNumber()
    lifetime_budget?: number;
}

export class CreateCampaignResponseDto {
    id: string;
}

export class DeleteCampaignResponseDto {
    success: boolean;
}

export class AdDto {
    id: string;
    name: string;
    status: string;
    creative?: {
        id: string;
    };
    created_time?: string;
    updated_time?: string;
}

export class AdListDto {
    data: AdDto[];
    paging?: {
        cursors?: { before?: string; after?: string };
        next?: string;
        previous?: string;
    };
}

export class InsightValueDto {
    date_start: string;
    date_stop: string;
    impressions?: string;
    reach?: string;
    clicks?: string;
    spend?: string;
    cpc?: string;
    cpm?: string;
    ctr?: string;
}

export class AdsInsightsResponseDto {
    data: InsightValueDto[];
    paging?: {
        cursors?: { before?: string; after?: string };
        next?: string;
        previous?: string;
    };
}

export class GetInsightsQueryDto {
    @IsOptional()
    @IsString()
    date_preset?: string;

    @IsOptional()
    @IsString()
    time_range?: string;

    @IsOptional()
    @IsString()
    fields?: string;
}
