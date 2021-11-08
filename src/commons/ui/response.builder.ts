import { BaseTransformer } from './base.transformer';
export default ((
    code: {
        code: number,
        message: string,
    },
    transformer?: BaseTransformer,
    data?: any,
    meta?: {
        page: number,
        perPage: number,
        totalPage: number
    } | undefined
) => {
    let res;
    if (transformer) {
        switch (transformer.method) {
            case 'create':
                res = transformer.transformCreated(data);
                break;
            case 'list':
                res = transformer.transformList(data, meta);
                break;
            case 'detail':
                res = transformer.transformDetail(data)
                break;
            default:
                res = {}
        }
    }

    return {
        code: code.code,
        message: code.message,
        data: res,
    }
})