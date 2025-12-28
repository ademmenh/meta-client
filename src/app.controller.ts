import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiEmptyDto } from './common/api/decorators/empty-dto.decorator';
import { RBody } from './common/api/decorators/response-transform.decorator';
import { EmptyDto } from './common/api/dto/empty.dto';

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) { }

    @Get('health')
    @ApiEmptyDto()
    @RBody({ dto: EmptyDto })
    getHealth(): string {
        return this.appService.getHealth();
    }
}
