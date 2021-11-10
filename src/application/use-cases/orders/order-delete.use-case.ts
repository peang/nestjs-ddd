import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { OrderDeleteDTO } from "src/application/dtos/orders/order-delete.dto";
import { IOrderRepository } from "src/domain/repositories/order-repository.interface";
import { IUseCase } from "../IUseCase";

@Injectable()
export class OrderDeleteUseCase implements IUseCase {
    constructor(
        @Inject("OrderRepositoryInterface") private readonly orderRepository: IOrderRepository,
    ) { }

    public async execute(dto: OrderDeleteDTO): Promise<any> {
        const order = await this.orderRepository.findOrderBy({id: dto.id})
        if (!order) {
            throw new NotFoundException('Order Not Found');
        }

        await this.orderRepository.remove(order);
    }
}