import * as Joi from '@hapi/joi';
import { DTOAdapter } from "src/application/dtos/DTOAdapter";
import { OrderDetailDTO } from "src/application/dtos/orders/order-detail.dto";
import { IApiRequest } from "src/application/types/app";

export class OrderDetailRequestAdapter {
    public async getDTO(payload: IApiRequest): Promise<OrderDetailDTO> {
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