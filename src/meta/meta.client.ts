import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MetaApiException, MetaApiError } from '../common/filters/meta-exception.filter';

export interface MetaRequestOptions {
    method?: 'GET' | 'POST' | 'DELETE';
    params?: Record<string, string | number | boolean>;
    body?: Record<string, unknown>;
    retries?: number;
}

export interface MetaResponse<T> {
    data: T;
    paging?: {
        cursors?: {
            before?: string;
            after?: string;
        };
        next?: string;
        previous?: string;
    };
}

@Injectable()
export class MetaClient {
    private readonly logger = new Logger(MetaClient.name);
    private readonly baseUrl: string;
    private readonly accessToken: string;
    private readonly defaultRetries = 3;
    private readonly retryDelayMs = 1000;

    constructor(private readonly configService: ConfigService) {
        const graphVersion = this.configService.get<string>('meta.graphVersion');
        this.baseUrl = `https://graph.facebook.com/v${graphVersion}`;
        this.accessToken = this.configService.get<string>('meta.systemUserToken') || '';

        if (!this.accessToken) {
            this.logger.warn('META_SYSTEM_USER_TOKEN is not configured. API calls will fail.');
        }
    }

    async request<T>(
        endpoint: string,
        options: MetaRequestOptions = {},
    ): Promise<T> {
        const { method = 'GET', params = {}, body, retries = this.defaultRetries } = options;
        const url = this.buildUrl(endpoint, params);
        return this.executeWithRetry<T>(url, method, body, retries);
    }

    private buildUrl(endpoint: string, params: Record<string, string | number | boolean>): string {
        const url = new URL(`${this.baseUrl}${endpoint}`);
        url.searchParams.set('access_token', this.accessToken);
        Object.entries(params).forEach(([key, value]) => {
            url.searchParams.set(key, String(value));
        });
        return url.toString();
    }

    private async executeWithRetry<T>(
        url: string,
        method: string,
        body: Record<string, unknown> | undefined,
        retriesLeft: number,
    ): Promise<T> {
        try {
            const response = await this.fetchWithTimeout(url, method, body);

            if (!response.ok) {
                const errorData = await response.json();
                this.handleErrorResponse(errorData, response.status, retriesLeft);
            }

            return await response.json() as T;
        } catch (error) {
            if (error instanceof MetaApiException) {
                if (this.isRateLimitError(error) && retriesLeft > 0) {
                    this.logger.warn(
                        `Rate limited. Retrying in ${this.retryDelayMs}ms. Retries left: ${retriesLeft}`,
                    );
                    await this.delay(this.retryDelayMs);
                    return this.executeWithRetry<T>(url, method, body, retriesLeft - 1);
                }
                throw error;
            }

            if (retriesLeft > 0) {
                this.logger.warn(
                    `Request failed. Retrying in ${this.retryDelayMs}ms. Retries left: ${retriesLeft}`,
                );
                await this.delay(this.retryDelayMs);
                return this.executeWithRetry<T>(url, method, body, retriesLeft - 1);
            }

            throw new MetaApiException({
                message: error instanceof Error ? error.message : 'Unknown error occurred',
                type: 'NetworkError',
                code: -1,
            });
        }
    }

    private async fetchWithTimeout(
        url: string,
        method: string,
        body?: Record<string, unknown>,
        timeoutMs = 30000,
    ): Promise<Response> {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

        try {
            const headers: HeadersInit = {
                'Content-Type': 'application/json',
            };

            const fetchOptions: RequestInit = {
                method,
                headers,
                signal: controller.signal,
            };

            if (body && (method === 'POST' || method === 'DELETE')) {
                fetchOptions.body = JSON.stringify(body);
            }

            return await fetch(url, fetchOptions);
        } finally {
            clearTimeout(timeoutId);
        }
    }

    private handleErrorResponse(
        errorData: { error?: MetaApiError },
        httpStatus: number,
        retriesLeft: number,
    ): never {
        const metaError = errorData.error;

        if (!metaError) {
            throw new MetaApiException(
                {
                    message: 'Unknown Meta API error',
                    type: 'UnknownError',
                    code: -1,
                },
                httpStatus,
            );
        }

        this.logger.error(
            `Meta API Error: ${metaError.message} (code: ${metaError.code}, subcode: ${metaError.error_subcode})`,
        );

        throw new MetaApiException(metaError, httpStatus);
    }

    private isRateLimitError(error: MetaApiException): boolean {
        const rateLimitCodes = [4, 17, 341];
        return rateLimitCodes.includes(error.metaError.code);
    }

    private delay(ms: number): Promise<void> {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async get<T>(
        endpoint: string,
        params?: Record<string, string | number | boolean>,
    ): Promise<T> {
        return this.request<T>(endpoint, { method: 'GET', params });
    }

    async post<T>(
        endpoint: string,
        body: Record<string, unknown>,
        params?: Record<string, string | number | boolean>,
    ): Promise<T> {
        return this.request<T>(endpoint, { method: 'POST', body, params });
    }

    async delete<T>(
        endpoint: string,
        params?: Record<string, string | number | boolean>,
    ): Promise<T> {
        return this.request<T>(endpoint, { method: 'DELETE', params });
    }
}
