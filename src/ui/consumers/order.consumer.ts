import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from "@nestjs/microservices";

@Controller()
export class OrderConsumer {
    @MessagePattern('order.created') // Our topic name
    orderCreated(@Payload() message) {
        return message;
    }
}
