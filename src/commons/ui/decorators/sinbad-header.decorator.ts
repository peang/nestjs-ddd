import { createParamDecorator, ExecutionContext } from '@nestjs/common';


let headers: Record<string, any> = {};

export const SinbadHeaders = createParamDecorator(
    (key: string, ctx: ExecutionContext) => {
        if (key) {
            return headers[key];
        } else {
            return headers;
        }
    },
);

export const SinbadSetHeaders = (data: Record<string, any>) => {
    headers = data;
}

export const SinbadGetHeaders = () => {
    return headers;
}
