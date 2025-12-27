import { Injectable, Logger } from '@nestjs/common';
import { MetaClient } from '../meta/meta.client';
import { CacheService } from '../common/services/cache.service';
import {
    AdAccountDto,
    AdAccountListDto,
    CampaignDto,
    CampaignListDto,
    CreateCampaignDto,
    UpdateCampaignDto,
    CreateCampaignResponseDto,
    DeleteCampaignResponseDto,
    AdListDto,
    AdsInsightsResponseDto,
    GetInsightsQueryDto,
} from './dto/ads.dto';

@Injectable()
export class AdsService {
    private readonly logger = new Logger(AdsService.name);
    private readonly CACHE_TTL_SECONDS = 300;

    constructor(
        private readonly metaClient: MetaClient,
        private readonly cacheService: CacheService,
    ) { }

    async listAdAccounts(): Promise<AdAccountListDto> {
        const cacheKey = 'ads:accounts';
        const cached = this.cacheService.get<AdAccountListDto>(cacheKey);
        if (cached) {
            this.logger.debug('Cache hit for ad accounts');
            return cached;
        }

        const response = await this.metaClient.get<AdAccountListDto>('/me/adaccounts', {
            fields: 'id,account_id,name,account_status,currency,timezone_name,amount_spent,balance',
        });

        this.cacheService.set(cacheKey, response, this.CACHE_TTL_SECONDS);
        return response;
    }

    async getAdAccount(accountId: string): Promise<AdAccountDto> {
        return this.metaClient.get<AdAccountDto>(`/${accountId}`, {
            fields: 'id,account_id,name,account_status,currency,timezone_name,amount_spent,balance',
        });
    }

    async getCampaigns(accountId: string): Promise<CampaignListDto> {
        return this.metaClient.get<CampaignListDto>(`/${accountId}/campaigns`, {
            fields: 'id,name,status,objective,created_time,updated_time,daily_budget,lifetime_budget',
        });
    }

    async getCampaign(campaignId: string): Promise<CampaignDto> {
        return this.metaClient.get<CampaignDto>(`/${campaignId}`, {
            fields: 'id,name,status,objective,created_time,updated_time,daily_budget,lifetime_budget',
        });
    }

    async createCampaign(accountId: string, dto: CreateCampaignDto): Promise<CreateCampaignResponseDto> {
        const body: Record<string, unknown> = {
            name: dto.name,
            objective: dto.objective,
            status: dto.status || 'PAUSED',
            special_ad_categories: dto.special_ad_categories || '[]',
        };

        if (dto.daily_budget) body.daily_budget = dto.daily_budget;
        if (dto.lifetime_budget) body.lifetime_budget = dto.lifetime_budget;

        return this.metaClient.post<CreateCampaignResponseDto>(`/${accountId}/campaigns`, body);
    }

    async updateCampaign(campaignId: string, dto: UpdateCampaignDto): Promise<CampaignDto> {
        const body: Record<string, unknown> = {};

        if (dto.name) body.name = dto.name;
        if (dto.status) body.status = dto.status;
        if (dto.daily_budget) body.daily_budget = dto.daily_budget;
        if (dto.lifetime_budget) body.lifetime_budget = dto.lifetime_budget;

        await this.metaClient.post<{ success: boolean }>(`/${campaignId}`, body);
        return this.getCampaign(campaignId);
    }

    async deleteCampaign(campaignId: string): Promise<DeleteCampaignResponseDto> {
        return this.metaClient.delete<DeleteCampaignResponseDto>(`/${campaignId}`);
    }

    async getAds(campaignId: string): Promise<AdListDto> {
        return this.metaClient.get<AdListDto>(`/${campaignId}/ads`, {
            fields: 'id,name,status,creative,created_time,updated_time',
        });
    }

    async getCampaignInsights(campaignId: string, query: GetInsightsQueryDto): Promise<AdsInsightsResponseDto> {
        const params: Record<string, string> = {
            fields: query.fields || 'impressions,reach,clicks,spend,cpc,cpm,ctr',
        };
        if (query.date_preset) params.date_preset = query.date_preset;

        return this.metaClient.get<AdsInsightsResponseDto>(`/${campaignId}/insights`, params);
    }

    async getAdAccountInsights(accountId: string, query: GetInsightsQueryDto): Promise<AdsInsightsResponseDto> {
        const params: Record<string, string> = {
            fields: query.fields || 'impressions,reach,clicks,spend,cpc,cpm,ctr',
        };
        if (query.date_preset) params.date_preset = query.date_preset;

        return this.metaClient.get<AdsInsightsResponseDto>(`/${accountId}/insights`, params);
    }
}
