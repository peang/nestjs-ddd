export default ((code: {
    code: number,
    message: string,
}, data: any, meta?: {
    page: number,
    perPage: number,
    totalPage: number
} | undefined) => {
    const res = {
        code: code.code,
        message: code.message,
        data,
    }

    if (meta) {
        res['meta'] = meta;
    }

    return res;
})