import { Order } from "src/domain/entities/order.entities";

export class OrderCreatedEvent {
    public static eventName = 'order.created';

    constructor(
        public readonly order: Order,
    ) { }
}