import { NotImplementedException } from '@nestjs/common';

export class BaseTransformer {
    constructor(
        public method: 'create' | 'detail' | 'list' = 'create'
    ) {}

    public transformCreated(data: Partial<any>): Record<string, any> {
        return {
            id: data.id,
            createdAt: data?.createdAt,
            updatedAt: data?.updatedAt,
        }
    }

    public transformDetail(data: Partial<any>): Record<string, any> {
        throw new NotImplementedException();
    }

    public transformList(datas: Partial<any[]>, meta: {
        page: number,
        perPage: number,
        totalPage: number
    } | undefined):Record<string, any>[] {
        throw new NotImplementedException();
    }
}