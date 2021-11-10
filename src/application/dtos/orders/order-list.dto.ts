import * as Joi from '@hapi/joi';
import { IApiRequest } from "src/application/types/app";
import { DTOAdapter } from "../DTOAdapter";

export class OrderListDTO extends DTOAdapter {
    constructor(
        public readonly id: string,
        public readonly page: number,
        public readonly perPage: number,
        public readonly sort: string,
        public readonly sortBy: string,
    ) {
        super();
    }

    public async getPayload(payload: IApiRequest): Promise<OrderListDTO> {
        payload = await DTOAdapter.validate(payload, this.getScheme());

        return new OrderListDTO(
            payload.query.id,
            payload.query.page,
            payload.query.perPage,
            payload.query.sort,
            payload.query.sortBy,
        );
    }

    public getScheme(): Joi.ObjectSchema {
        return Joi.object({
            query: Joi.object({
                id: Joi.string().optional(),
                page: Joi.number().optional().default(1),
                perPage: Joi.number().optional().default(10),
                sort: Joi.string().optional(),
                sortBy: Joi.string().optional(),
            }).optional(),
        });
    }
}