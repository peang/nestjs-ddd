import { Command, CommandRunner } from 'nest-commander';
import responseBuilder from 'src/commons/ui/response.builder';
import { OrderDetailService } from '../../application/services/orders/order-detail.service';
import { BaseCommand } from '../../commons/ui/base.command';
import { Order } from '../../domain/entities/order.entities';
import responseCode from '../helpers/response.code';
import { OrderDetailRequestAdapter } from '../request-adapters/order/order-detail.request-adapter';
import { OrderTransformer } from '../transformers/order.transformer';
@Command({
    name: 'order-detail',
    arguments: '[id]',
})
export class OrderCommand extends BaseCommand implements CommandRunner {
    constructor(
        private readonly orderDetailRequestAdapter: OrderDetailRequestAdapter, // DTO via Request Adapter
        private readonly orderDetailService: OrderDetailService,
    ) {
        super();
    }

    // Sample creating order from cli commands with params
    // More info visit https://jmcdo29.github.io/nest-commander/docs/features/factory/#logging
    public async run(inputs: string[], options?: Record<string, any>): Promise<any> {
        const id = inputs[0];

        const dto = await this.orderDetailRequestAdapter.getDTO({
            params: {
                id
            }
        });

        const order: Order | null = await this.orderDetailService.execute(dto);

        let response = responseBuilder(responseCode.ORDER_NOT_FOUND)
        if (order) {
            response = responseBuilder(responseCode.ORDER_DETAIL, new OrderTransformer('detail'), order)
        }

        return response;
    }
}