export class MetaErrorDto {
    message: string;
    type: string;
    code: number;
    error_subcode?: number;
    fbtrace_id?: string;
}

export class MetaErrorResponseDto {
    error: MetaErrorDto;
}
