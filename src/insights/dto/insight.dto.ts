import { IsOptional, IsString, IsEnum } from 'class-validator';
import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

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
    @ApiProperty({ example: 'page_impressions', required: false })
    metric?: string;

    @IsOptional()
    @IsEnum(InsightPeriod)
    @ApiProperty({ enum: InsightPeriod, example: InsightPeriod.DAY, required: false })
    period?: InsightPeriod;

    @IsOptional()
    @IsEnum(InsightDatePreset)
    @ApiProperty({ enum: InsightDatePreset, example: InsightDatePreset.THIS_MONTH, required: false })
    date_preset?: InsightDatePreset;
}

export class InsightValueDto {
    @Expose()
    @ApiProperty({ example: 120 })
    value: number | Record<string, number>;

    @Expose()
    @ApiProperty({ example: '2023-01-31T23:59:59+0000', required: false })
    end_time?: string;
}

export class InsightDto {
    @Expose()
    @ApiProperty({ example: 'page_impressions' })
    id: string;

    @Expose()
    @ApiProperty({ example: 'Page Impressions' })
    name: string;

    @Expose()
    @ApiProperty({ example: 'day' })
    period: string;

    @Expose()
    @ApiProperty({ example: 'Daily Impressions' })
    title: string;

    @Expose()
    @ApiProperty({ example: 'The number of times your Page posts were on a person\'s screen.' })
    description: string;

    @Expose()
    @ApiProperty({ type: [InsightValueDto] })
    values: InsightValueDto[];
}

export class InsightsResponseDto {
    @Expose()
    @ApiProperty({ type: [InsightDto] })
    data: InsightDto[];

    @Expose()
    @ApiProperty({ required: false })
    paging?: {
        previous?: string;
        next?: string;
    };
}
