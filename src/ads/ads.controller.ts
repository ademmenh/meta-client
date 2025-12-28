import {
    Controller,
    Get,
    Post,
    Delete,
    Param,
    Body,
    Query,
} from '@nestjs/common';
import { ApiDto } from '../common/api/decorators/api.dto.decorator';
import { ApiPaginatedDto } from '../common/api/decorators/paginated-dto.decorator';
import { RBody } from '../common/api/decorators/response-transform.decorator';
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
    AdDto,
    InsightValueDto,
    AdsInsightsResponseDto,
    GetInsightsQueryDto,
} from './dto/ads.dto';

@Controller('ads')
export class AdsController {
    constructor(private readonly adsService: AdsService) { }

    @Get('accounts')
    @ApiPaginatedDto({ type: AdAccountDto })
    @RBody({ dto: AdAccountDto })
    async listAdAccounts(): Promise<AdAccountListDto> {
        return this.adsService.listAdAccounts();
    }

    @Get('accounts/:id')
    @ApiDto({ type: AdAccountDto })
    @RBody({ dto: AdAccountDto })
    async getAdAccount(@Param('id') id: string): Promise<AdAccountDto> {
        return this.adsService.getAdAccount(id);
    }

    @Get('accounts/:id/campaigns')
    @ApiPaginatedDto({ type: CampaignDto })
    @RBody({ dto: CampaignDto })
    async getCampaigns(@Param('id') accountId: string): Promise<CampaignListDto> {
        return this.adsService.getCampaigns(accountId);
    }

    @Post('accounts/:id/campaigns')
    @ApiDto({ type: CreateCampaignResponseDto })
    @RBody({ dto: CreateCampaignResponseDto })
    async createCampaign(
        @Param('id') accountId: string,
        @Body() dto: CreateCampaignDto,
    ): Promise<CreateCampaignResponseDto> {
        return this.adsService.createCampaign(accountId, dto);
    }

    @Get('campaigns/:id')
    @ApiDto({ type: CampaignDto })
    @RBody({ dto: CampaignDto })
    async getCampaign(@Param('id') campaignId: string): Promise<CampaignDto> {
        return this.adsService.getCampaign(campaignId);
    }

    @Post('campaigns/:id')
    @ApiDto({ type: CampaignDto })
    @RBody({ dto: CampaignDto })
    async updateCampaign(
        @Param('id') campaignId: string,
        @Body() dto: UpdateCampaignDto,
    ): Promise<CampaignDto> {
        return this.adsService.updateCampaign(campaignId, dto);
    }

    @Delete('campaigns/:id')
    @ApiDto({ type: DeleteCampaignResponseDto })
    @RBody({ dto: DeleteCampaignResponseDto })
    async deleteCampaign(@Param('id') campaignId: string): Promise<DeleteCampaignResponseDto> {
        return this.adsService.deleteCampaign(campaignId);
    }

    @Get('campaigns/:id/ads')
    @ApiPaginatedDto({ type: AdDto })
    @RBody({ dto: AdDto })
    async getAds(@Param('id') campaignId: string): Promise<AdListDto> {
        return this.adsService.getAds(campaignId);
    }

    @Get('campaigns/:id/insights')
    @ApiPaginatedDto({ type: InsightValueDto })
    @RBody({ dto: InsightValueDto })
    async getCampaignInsights(
        @Param('id') campaignId: string,
        @Query() query: GetInsightsQueryDto,
    ): Promise<AdsInsightsResponseDto> {
        return this.adsService.getCampaignInsights(campaignId, query);
    }

    @Get('accounts/:id/insights')
    @ApiPaginatedDto({ type: InsightValueDto })
    @RBody({ dto: InsightValueDto })
    async getAdAccountInsights(
        @Param('id') accountId: string,
        @Query() query: GetInsightsQueryDto,
    ): Promise<AdsInsightsResponseDto> {
        return this.adsService.getAdAccountInsights(accountId, query);
    }
}
