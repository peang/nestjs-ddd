export type IApiRequest = {
    query?: any;
    body?: any;
    params?: any;
    context?: any;
}

export type IApiResponse = {
    code: number;
    data: Record<string, unknown>;
    meta?: Record<string, unknown>
}

export type IMetaResponse = {
    page: number;
    perPage: number;
    totalPage: number
}