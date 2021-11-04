import { OnEvent } from "@nestjs/event-emitter";
import { OrderCreatedEvent } from '../../events/orders/OrderCreatedEvent';

export class OrderCreatedEventHandler {
    @OnEvent(OrderCreatedEvent.eventName)
    handle(payload: any) {
        console.log('Order Created Event Handler :');
        console.log(payload);
        // Here you can
        // Trigger Publisher ...
        // etc.
    }
}