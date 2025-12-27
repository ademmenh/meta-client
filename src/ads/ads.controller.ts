import {
    Controller,
    Get,
    Post,
    Delete,
    Param,
    Body,
    Query,
} from '@nestjs/common';
import { AdsService } from './ads.service';
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

@Controller('ads')
export class AdsController {
    constructor(private readonly adsService: AdsService) { }

    @Get('accounts')
    async listAdAccounts(): Promise<AdAccountListDto> {
        return this.adsService.listAdAccounts();
    }

    @Get('accounts/:id')
    async getAdAccount(@Param('id') id: string): Promise<AdAccountDto> {
        return this.adsService.getAdAccount(id);
    }

    @Get('accounts/:id/campaigns')
    async getCampaigns(@Param('id') accountId: string): Promise<CampaignListDto> {
        return this.adsService.getCampaigns(accountId);
    }

    @Post('accounts/:id/campaigns')
    async createCampaign(
        @Param('id') accountId: string,
        @Body() dto: CreateCampaignDto,
    ): Promise<CreateCampaignResponseDto> {
        return this.adsService.createCampaign(accountId, dto);
    }

    @Get('campaigns/:id')
    async getCampaign(@Param('id') campaignId: string): Promise<CampaignDto> {
        return this.adsService.getCampaign(campaignId);
    }

    @Post('campaigns/:id')
    async updateCampaign(
        @Param('id') campaignId: string,
        @Body() dto: UpdateCampaignDto,
    ): Promise<CampaignDto> {
        return this.adsService.updateCampaign(campaignId, dto);
    }

    @Delete('campaigns/:id')
    async deleteCampaign(@Param('id') campaignId: string): Promise<DeleteCampaignResponseDto> {
        return this.adsService.deleteCampaign(campaignId);
    }

    @Get('campaigns/:id/ads')
    async getAds(@Param('id') campaignId: string): Promise<AdListDto> {
        return this.adsService.getAds(campaignId);
    }

    @Get('campaigns/:id/insights')
    async getCampaignInsights(
        @Param('id') campaignId: string,
        @Query() query: GetInsightsQueryDto,
    ): Promise<AdsInsightsResponseDto> {
        return this.adsService.getCampaignInsights(campaignId, query);
    }

    @Get('accounts/:id/insights')
    async getAdAccountInsights(
        @Param('id') accountId: string,
        @Query() query: GetInsightsQueryDto,
    ): Promise<AdsInsightsResponseDto> {
        return this.adsService.getAdAccountInsights(accountId, query);
    }
}
