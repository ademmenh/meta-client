import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    HttpException,
    HttpStatus,
    Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { ErrorResponseDto } from '../dto/error-response.dto';
import { ErrorCode } from '../enums/error-codes.enum';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
    private readonly logger = new Logger(HttpExceptionFilter.name);

    catch(exception: unknown, host: ArgumentsHost): void {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();

        let status: number;
        let errorCode: ErrorCode;
        let message: string;
        let details: Record<string, unknown> | undefined;

        if (exception instanceof HttpException) {
            status = exception.getStatus();
            const exceptionResponse = exception.getResponse();

            if (typeof exceptionResponse === 'string') {
                message = exceptionResponse;
            } else if (typeof exceptionResponse === 'object') {
                const responseObj = exceptionResponse as Record<string, unknown>;
                message = (responseObj.message as string) || exception.message;

                if (Array.isArray(responseObj.message)) {
                    message = responseObj.message.join(', ');
                    details = { validationErrors: responseObj.message };
                }
            } else {
                message = exception.message;
            }

            errorCode = this.mapHttpStatusToErrorCode(status);
        } else {
            status = HttpStatus.INTERNAL_SERVER_ERROR;
            errorCode = ErrorCode.INTERNAL_ERROR;
            message = 'An unexpected error occurred';

            this.logger.error(
                `Unhandled exception: ${exception}`,
                exception instanceof Error ? exception.stack : undefined,
            );
        }

        const errorResponse = new ErrorResponseDto(errorCode, message, details);

        this.logger.warn(
            `${request.method} ${request.url} - ${status} - ${errorCode}: ${message}`,
        );

        response.status(status).json(errorResponse);
    }

    private mapHttpStatusToErrorCode(status: number): ErrorCode {
        switch (status) {
            case HttpStatus.BAD_REQUEST:
                return ErrorCode.VALIDATION_ERROR;
            case HttpStatus.UNAUTHORIZED:
                return ErrorCode.UNAUTHORIZED;
            case HttpStatus.FORBIDDEN:
                return ErrorCode.FORBIDDEN;
            case HttpStatus.NOT_FOUND:
                return ErrorCode.NOT_FOUND;
            default:
                return ErrorCode.INTERNAL_ERROR;
        }
    }
}
