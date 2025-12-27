import { Module, Global } from '@nestjs/common';
import { MetaClient } from './meta.client';

@Global()
@Module({
    providers: [MetaClient],
    exports: [MetaClient],
})
export class MetaModule { }
