import { ObjectSchema, Schema } from '@hapi/joi';
import { BadRequestException, NotImplementedException } from "@nestjs/common";
import { IApiRequest } from "../types/app";

const defaultOptions = {
    stripUnknown: {
        arrays: false,
        objects: true,
    },
    abortEarly: false,
}
export class DTOAdapter {
    public static async validate(payload: Record<string, unknown>, schema: Schema, options: Record<string, unknown> = defaultOptions) {
        return schema.validateAsync(payload, options)
            .catch((err) => {
                const details = err.details.reduce((detail: any, item: any) => {
                    detail[item.context.key] = item.message.replace(/"/g, '');
                    return detail;
                }, {});
                throw new BadRequestException(details);
            })
    }

    public async getPayload(payload: IApiRequest): Promise<DTOAdapter> {
        throw new NotImplementedException();
    }

    public getScheme(): ObjectSchema {
        throw new NotImplementedException();
    }
}