import { ErrorCode } from '../enums/error-codes.enum';

export class ErrorDetail {
    code: ErrorCode;
    message: string;
    details?: Record<string, unknown>;
}

export class ErrorResponseDto {
    error: ErrorDetail;

    constructor(code: ErrorCode, message: string, details?: Record<string, unknown>) {
        this.error = {
            code,
            message,
            details,
        };
    }
}
