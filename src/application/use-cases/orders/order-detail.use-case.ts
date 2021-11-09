import { Inject, Injectable } from "@nestjs/common";
import { OrderDetailDTO } from "src/application/dtos/orders/order-detail.dto";
import { Order } from "src/domain/entities/order.entities";
import { IOrderRepository } from "src/domain/repositories/order-repository.interface";
import { IUseCase } from "../IUseCase";

@Injectable()
export class OrderDetailUseCase implements IUseCase {
    constructor(
        @Inject("OrderRepositoryInterface") private readonly orderRepository: IOrderRepository
    ) { }

    public async execute(dto: OrderDetailDTO): Promise<Order | null> {
        return await this.orderRepository.findOrderBy({ id: dto.id });
    }
}