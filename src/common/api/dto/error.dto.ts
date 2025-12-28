import { ApiProperty } from '@nestjs/swagger';

export class ErrorDetailDto {
    @ApiProperty({ example: 'META_PERMISSION_DENIED' })
    code: string;

    @ApiProperty({ example: 'The user has not granted the required permissions' })
    message: string;

    @ApiProperty({
        required: false,
        example: {
            metaErrorCode: 200,
            metaTraceId: 'Ap0bLlB74ALrrFoGMi_-816'
        }
    })
    details?: Record<string, any>;
}

export class ErrorDto {
    @ApiProperty({ type: ErrorDetailDto })
    error: ErrorDetailDto;
}
