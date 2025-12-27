import { IsOptional, IsString } from 'class-validator';

export class PageDto {
    id: string;
    name: string;
    category?: string;
    category_list?: { id: string; name: string }[];
    access_token?: string;
    tasks?: string[];
}

export class PageListResponseDto {
    data: PageDto[];
    paging?: {
        cursors?: {
            before?: string;
            after?: string;
        };
        next?: string;
        previous?: string;
    };
}

export class GetPageQueryDto {
    @IsOptional()
    @IsString()
    fields?: string;
}
