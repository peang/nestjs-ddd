import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { EventEmitter2 } from '@nestjs/event-emitter';
import { OrderUpdateDTO } from "src/application/dtos/orders/order-update.dto";
import { IOrderRepository } from "src/domain/repositories/order-repository.interface";
import { OrderItem } from "src/domain/value_objects/order/order-item.vo";
import { OrderStatus } from '../../../domain/value_objects/order/order-status.vo';
import { IUseCase } from "../IUseCase";

@Injectable()
export class OrderUpdateUseCase implements IUseCase {
    constructor(
        @Inject("OrderRepositoryInterface") private readonly orderRepository: IOrderRepository,
        private eventEmitter: EventEmitter2,
    ) { }

    public async execute(dto: OrderUpdateDTO): Promise<any> {
        const order = await this.orderRepository.findOrderBy({id: dto.id})
        if (!order) {
            throw new NotFoundException('Order Not Found');
        }

        if (dto.items) {
            const items = dto.items.map((item) => {
                return OrderItem.create(item.name, item.qty, item.price);
            })
    
            order.setItems(items);
        }

        if (dto.status) {
            const status = OrderStatus.create(dto.status);
            console.log(status);
            
            order.setStatus(status);
        }
        
        await this.orderRepository.persist(order);
        
        return order;
    }
}