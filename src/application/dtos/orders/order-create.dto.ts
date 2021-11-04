import * as Joi from '@hapi/joi';
import { IApiRequest } from 'src/application/types/app';
import { DTOAdapter } from "../DTOAdapter";

export class OrderCreateDTO extends DTOAdapter {
    constructor(
        public readonly items: {
            name: string,
            qty: number,
            price: number,
        }[],
    ) {
        super();
    }

    public async getPayload(payload: IApiRequest): Promise<OrderCreateDTO> {
        payload = await DTOAdapter.validate(payload, this.getScheme());

        return new OrderCreateDTO(
            payload.body.items
        );
    }

    public getScheme(): Joi.ObjectSchema {
        return Joi.object({
            body: Joi.object({
                items: Joi.array().required(),
            }).required(),
        });
    }
}