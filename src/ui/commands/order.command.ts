import { BadRequestException, UseInterceptors } from '@nestjs/common';
import { Command, CommandRunner } from 'nest-commander';
import { Order } from 'src/domain/entities/order.entities';
import { OrderDetailService } from '../../application/services/orders/order-detail.service';
import responseBuilder from '../helpers/response-builder';
import responseCode from '../helpers/response-code';
import { LoggerInterceptor } from '../interceptors/logger.interceptor';
import { OrderDetailRequestAdapter } from '../request-adapters/order/order-detail.request-adapter';
import { OrderTransformer } from '../transformers/order.transformer';
import { BaseCommand } from './base.command';
@Command({
    name: 'order-detail',
    arguments: '[id]',
})
@UseInterceptors(LoggerInterceptor)
export class OrderCommand extends BaseCommand implements CommandRunner {
    constructor(
        private readonly orderDetailRequestAdapter: OrderDetailRequestAdapter, // DTO via Request Adapter
        private readonly orderDetailService: OrderDetailService,
    ) {
        super();
    }

    // Sample creating order from cli commands with params
    // More info visit https://jmcdo29.github.io/nest-commander/docs/features/factory/#logging
    public async run(inputs: string[], options?: Record<string, any>): Promise<void> {
        this.start('order-detail');

        try {
            const id = inputs[0];

            const dto = await this.orderDetailRequestAdapter.getDTO({
                params: {
                    id
                }
            });

            const order: Order | null = await this.orderDetailService.execute(dto);

            let response = responseBuilder(responseCode.ORDER_NOT_FOUND, {})
            if (order) {
                response = responseBuilder(responseCode.ORDER_DETAIL, OrderTransformer.transformDetail(order))
            }
            this.finish(JSON.stringify(response));
        } catch(err) {
            this.fail(JSON.stringify(err));
        }
    }
}