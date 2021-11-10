import { IApiRequest } from "src/application/types/app";
import { DTOAdapter } from "../DTOAdapter";
import * as Joi from '@hapi/joi';
export class OrderDetailDTO extends DTOAdapter {
    constructor(
        public readonly id: string,
    ) {
        super();
    }

    public async getPayload(payload: IApiRequest): Promise<OrderDetailDTO> {
        payload = await DTOAdapter.validate(payload, this.getScheme());

        return new OrderDetailDTO(
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