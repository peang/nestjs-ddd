import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { OrderCreateDTO } from 'src/application/dtos/orders/order-create.dto';
import { OrderDetailDTO } from 'src/application/dtos/orders/order-detail.dto';
import { OrderUpdateDTO } from 'src/application/dtos/orders/order-update.dto';
import { IApiResponse } from 'src/application/types/app';
import { OrderCreateUseCase } from 'src/application/use-cases/orders/order-create.use-case';
import { OrderDeleteUseCase } from 'src/application/use-cases/orders/order-delete.use-case';
import { OrderDetailUseCase } from 'src/application/use-cases/orders/order-detail.use-case';
import { OrderListUseCase } from 'src/application/use-cases/orders/order-list.use-case';
import { OrderUpdateUseCase } from 'src/application/use-cases/orders/order-update.use-case';
import { Order } from 'src/domain/entities/order.entities';
import { OrderDeleteDTO } from '../../application/dtos/orders/order-delete.dto';
import { OrderListDTO } from '../../application/dtos/orders/order-list.dto';
import ResponseBuilder from '../../commons/ui/response.builder';
import ResponseCode from '../helpers/response.code';
import { OrderTransformer } from '../transformers/order.transformer';

@Controller('orders')
export class OrderController {
    constructor(
        private readonly orderCreateDto: OrderCreateDTO,
        private readonly orderCreateUseCase: OrderCreateUseCase,
        private readonly orderDetailDTO: OrderDetailDTO, 
        private readonly orderDetailUseCase: OrderDetailUseCase,
        private readonly orderListDTO: OrderListDTO,
        private readonly orderListUseCase: OrderListUseCase,
        private readonly orderUpdateDTO: OrderUpdateDTO,
        private readonly orderUpdateUseCase: OrderUpdateUseCase,
        private readonly orderDeleteDTO: OrderDeleteDTO,
        private readonly orderDeleteUseCase: OrderDeleteUseCase,
    ) { }

    @Post()
    public async create(@Body() body): Promise<IApiResponse> {
        const dto = await this.orderCreateDto.getPayload({ body: body });

        const order: Order = await this.orderCreateUseCase.execute(dto);

        return ResponseBuilder(ResponseCode.ORDER_CREATED, new OrderTransformer(), order)
    }

    @Get()
    public async list(@Query() query): Promise<IApiResponse> {
        const dto = await this.orderListDTO.getPayload({ query: query });

        const data = await this.orderListUseCase.execute(dto);

        return ResponseBuilder(ResponseCode.ORDER_LIST, new OrderTransformer('list'), data.data, data.meta)
    }

    @Get('/:id')
    public async detail(@Param() param): Promise<IApiResponse> {
        const dto = await this.orderDetailDTO.getPayload({ params: param });

        const order: Order | null = await this.orderDetailUseCase.execute(dto);
        if (!order) {
            return ResponseBuilder(ResponseCode.ORDER_NOT_FOUND)
        }

        return ResponseBuilder(ResponseCode.ORDER_DETAIL, new OrderTransformer('detail'), order)
    }

    @Put('/:id')
    public async update(@Param() params, @Body() body): Promise<IApiResponse> {
        const dto = await this.orderUpdateDTO.getPayload({ params, body });

        const order: Order = await this.orderUpdateUseCase.execute(dto);

        return ResponseBuilder(ResponseCode.ORDER_UPDATED, new OrderTransformer('detail'), order)
    }

    @Delete('/:id')
    public async delete(@Param() params): Promise<IApiResponse> {
        const dto = await this.orderDeleteDTO.getPayload({ params });

        await this.orderDeleteUseCase.execute(dto);

        return ResponseBuilder(ResponseCode.ORDER_DELETED)
    }
}
