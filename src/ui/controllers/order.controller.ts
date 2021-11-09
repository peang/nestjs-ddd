import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { OrderCreateDTO } from 'src/application/dtos/orders/order-create.dto';
import { OrderCreateUseCase } from 'src/application/use-cases/orders/order-create.use-case';
import { OrderDetailUseCase } from 'src/application/use-cases/orders/order-detail.use-case';
import { OrderListUseCase } from 'src/application/use-cases/orders/order-list.use-case';
import { IApiResponse } from 'src/application/types/app';
import { Order } from 'src/domain/entities/order.entities';
import ResponseBuilder from '../../commons/ui/response.builder';
import ResponseCode from '../helpers/response.code';
import { OrderDetailRequestAdapter } from '../request-adapters/order/order-detail.request-adapter';
import { OrderListRequestAdapter } from '../request-adapters/order/order-list.request-adapter';
import { OrderTransformer } from '../transformers/order.transformer';

@Controller('orders')
export class OrderController {
    constructor(
        private readonly orderCreateDto: OrderCreateDTO, // direct DTO (with request adapter)
        private readonly orderCreateService: OrderCreateUseCase,
        private readonly orderDetailRequestAdapter: OrderDetailRequestAdapter, // DTO via Request Adapter
        private readonly orderDetailService: OrderDetailUseCase,
        private readonly orderListRequestAdapter: OrderListRequestAdapter, // DTO via Request Adapter
        private readonly orderListService: OrderListUseCase,
    ) { }

    @Post()
    public async create(@Body() body): Promise<IApiResponse> {
        const dto = await this.orderCreateDto.getPayload({ body: body });

        const order: Order = await this.orderCreateService.execute(dto);

        return ResponseBuilder(ResponseCode.ORDER_CREATED, new OrderTransformer(), order)
    }

    @Get()
    public async list(@Query() query): Promise<IApiResponse> {
        const dto = await this.orderListRequestAdapter.getDTO({ query: query });

        const data = await this.orderListService.execute(dto);

        return ResponseBuilder(ResponseCode.ORDER_LIST, new OrderTransformer('list'), data.data, data.meta)
    }

    @Get('/:id')
    public async detail(@Param() param): Promise<IApiResponse> {
        const dto = await this.orderDetailRequestAdapter.getDTO({ params: param });

        const order: Order | null = await this.orderDetailService.execute(dto);
        if (!order) {
            return ResponseBuilder(ResponseCode.ORDER_NOT_FOUND)
        }

        return ResponseBuilder(ResponseCode.ORDER_DETAIL, new OrderTransformer('detail'), order)
    }
}
