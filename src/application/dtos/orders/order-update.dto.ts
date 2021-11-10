import * as Joi from '@hapi/joi';
import { IApiRequest } from "src/application/types/app";
import { DTOAdapter } from "../DTOAdapter";

export class OrderUpdateDTO extends DTOAdapter {
    constructor(
        public readonly id: string,
        public readonly items: {
            name: string,
            qty: number,
            price: number,
        }[],
        public readonly status: string
    ) {
        super();
    }

    public async getPayload(payload: IApiRequest): Promise<OrderUpdateDTO> {
        payload = await DTOAdapter.validate(payload, this.getScheme());

        return new OrderUpdateDTO(
            payload.params?.id,
            payload.body?.items,
            payload.body?.status,
        );
    }

    public getScheme(): Joi.ObjectSchema {
        return Joi.object({
            params: Joi.object({
                id: Joi.string().required(),
            }),
            body: Joi.object({
                items: Joi.array().default(null),
                status: Joi.string().optional(),
            }).optional(),
        });
    }
}