import { IsOptional, IsString, IsEnum } from 'class-validator';

export enum InsightPeriod {
    DAY = 'day',
    WEEK = 'week',
    DAYS_28 = 'days_28',
    LIFETIME = 'lifetime',
}

export enum InsightDatePreset {
    TODAY = 'today',
    YESTERDAY = 'yesterday',
    THIS_WEEK = 'this_week',
    LAST_WEEK = 'last_week',
    THIS_MONTH = 'this_month',
    LAST_MONTH = 'last_month',
}

export class GetInsightsQueryDto {
    @IsOptional()
    @IsString()
    metric?: string;

    @IsOptional()
    @IsEnum(InsightPeriod)
    period?: InsightPeriod;

    @IsOptional()
    @IsEnum(InsightDatePreset)
    date_preset?: InsightDatePreset;
}

export class InsightValueDto {
    value: number | Record<string, number>;
    end_time?: string;
}

export class InsightDto {
    id: string;
    name: string;
    period: string;
    title: string;
    description: string;
    values: InsightValueDto[];
}

export class InsightsResponseDto {
    data: InsightDto[];
    paging?: {
        previous?: string;
        next?: string;
    };
}
