import * as Joi from '@hapi/joi';
import { IApiRequest } from 'src/application/types/app';
import { DTOAdapter } from "../DTOAdapter";

export class OrderDeleteDTO extends DTOAdapter {
    constructor(
        public readonly id: string,
    ) {
        super();
    }

    public async getPayload(payload: IApiRequest): Promise<OrderDeleteDTO> {
        payload = await DTOAdapter.validate(payload, this.getScheme());

        return new OrderDeleteDTO(
            payload.params.id
        );
    }

    public getScheme(): Joi.ObjectSchema {
        return Joi.object({
            params: Joi.object({
                id: Joi.string().required(),
            }).required(),
        });
    }
}