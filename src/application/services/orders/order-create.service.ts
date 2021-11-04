import { Inject, Injectable } from "@nestjs/common";
import { EventEmitter2 } from '@nestjs/event-emitter';
import { OrderCreateDTO } from "src/application/dtos/orders/order-create.dto";
import { Order } from "src/domain/entities/order.entities";
import { IOrderRepository } from "src/domain/repositories/order-repository.interface";
import { OrderItem } from "src/domain/value_objects/order/order-item.vo";
import { OrderCreatedEvent } from '../../events/orders/OrderCreatedEvent';
import { IService } from "../IService";

@Injectable()
export class OrderCreateService implements IService {
    constructor(
        @Inject("OrderRepositoryInterface") private readonly orderRepository: IOrderRepository,
        private eventEmitter: EventEmitter2,
    ) { }

    public async execute(dto: OrderCreateDTO): Promise<any> {
        const items = dto.items.map((item) => {
            return OrderItem.create(item.name, item.qty, item.price);
        })
        const order = Order.create(items);

        await this.orderRepository.persist(order);

        this.eventEmitter.emit(OrderCreatedEvent.eventName, new OrderCreatedEvent(order))
        
        return order;
    }
}