import * as Joi from '@hapi/joi';
import { DTOAdapter } from "src/application/dtos/DTOAdapter";
import { OrderListDTO } from 'src/application/dtos/orders/order-list.dto';
import { IApiRequest } from "src/application/types/app";

export class OrderListRequestAdapter {
    public async getDTO(payload: IApiRequest): Promise<OrderListDTO> {
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
                sort: Joi.string().optional().default('id'),
                sortBy: Joi.string().optional().default('ASC'),
            }).optional().default({}),
        });
    }
}