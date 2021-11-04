import { Inject, Injectable } from "@nestjs/common";
import { OrderDetailDTO } from "src/application/dtos/orders/order-detail.dto";
import { Order } from "src/domain/entities/order.entities";
import { IOrderRepository } from "src/domain/repositories/order-repository.interface";
import { IService } from "../IService";

@Injectable()
export class OrderDetailService implements IService {
    constructor(
        @Inject("OrderRepositoryInterface") private readonly orderRepository: IOrderRepository
    ) { }

    public async execute(dto: OrderDetailDTO): Promise<Order | null> {
        return await this.orderRepository.findOrderBy({ id: dto.id });
    }
}