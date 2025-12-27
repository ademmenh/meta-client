import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    HttpStatus,
    Logger,
} from '@nestjs/common';
import { Response } from 'express';
import { ErrorResponseDto } from '../dto/error-response.dto';
import { ErrorCode } from '../enums/error-codes.enum';

export interface MetaApiError {
    message: string;
    type: string;
    code: number;
    error_subcode?: number;
    fbtrace_id?: string;
}

export class MetaApiException extends Error {
    constructor(
        public readonly metaError: MetaApiError,
        public readonly httpStatus: number = HttpStatus.BAD_REQUEST,
    ) {
        super(metaError.message);
        this.name = 'MetaApiException';
    }
}

@Catch(MetaApiException)
export class MetaExceptionFilter implements ExceptionFilter {
    private readonly logger = new Logger(MetaExceptionFilter.name);

    catch(exception: MetaApiException, host: ArgumentsHost): void {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();

        const errorCode = this.mapMetaErrorToCode(exception.metaError);
        const status = this.getHttpStatus(exception.metaError);

        const errorResponse = new ErrorResponseDto(
            errorCode,
            exception.metaError.message,
            {
                metaErrorCode: exception.metaError.code,
                metaErrorSubcode: exception.metaError.error_subcode,
                metaTraceId: exception.metaError.fbtrace_id,
            },
        );

        this.logger.warn(
            `Meta API Error: ${errorCode} - ${exception.metaError.message} (code: ${exception.metaError.code})`,
        );

        response.status(status).json(errorResponse);
    }

    private mapMetaErrorToCode(metaError: MetaApiError): ErrorCode {
        switch (metaError.code) {
            case 190:
                return ErrorCode.META_TOKEN_INVALID;
            case 200:
            case 10:
                return ErrorCode.META_PERMISSION_DENIED;
            case 4:
            case 17:
            case 341:
                return ErrorCode.META_RATE_LIMITED;
            case 100:
                if (metaError.error_subcode === 33) {
                    return ErrorCode.META_RESOURCE_NOT_FOUND;
                }
                return ErrorCode.META_API_ERROR;
            default:
                return ErrorCode.META_API_ERROR;
        }
    }

    private getHttpStatus(metaError: MetaApiError): number {
        switch (metaError.code) {
            case 190:
                return HttpStatus.UNAUTHORIZED;
            case 200:
            case 10:
                return HttpStatus.FORBIDDEN;
            case 4:
            case 17:
            case 341:
                return HttpStatus.TOO_MANY_REQUESTS;
            case 100:
                if (metaError.error_subcode === 33) {
                    return HttpStatus.NOT_FOUND;
                }
                return HttpStatus.BAD_REQUEST;
            default:
                return HttpStatus.BAD_REQUEST;
        }
    }
}
