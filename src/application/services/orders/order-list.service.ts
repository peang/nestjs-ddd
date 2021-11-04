import { Inject, Injectable } from "@nestjs/common";
import { OrderListDTO } from "src/application/dtos/orders/order-list.dto";
import { IMetaResponse } from "src/application/types/app";
import { Order } from "src/domain/entities/order.entities";
import { IOrderRepository } from "src/domain/repositories/order-repository.interface";
import { IService } from "../IService";

@Injectable()
export class OrderListService implements IService {
    constructor(
        @Inject("OrderRepositoryInterface")
        private readonly orderRepository: IOrderRepository
    ) { }

    public async execute(dto: OrderListDTO): Promise<{
        data: Order[],
        meta: IMetaResponse,
    }> {
        return await this.orderRepository.list(dto.page, dto.perPage, dto.sort, dto.sort, dto.id);
    }
}