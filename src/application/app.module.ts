import { Module } from '@nestjs/common';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { InfraModule } from 'src/infra/infra.module';
import { OrderCreateDTO } from './dtos/orders/order-create.dto';
import { OrderDetailDTO } from './dtos/orders/order-detail.dto';
import { OrderListDTO } from './dtos/orders/order-list.dto';
import { OrderCreatedEventHandler } from './event-handlers/orders/order-created.event-handler';
import { OrderCreateService } from './services/orders/order-create.service';
import { OrderDetailService } from './services/orders/order-detail.service';
import { OrderListService } from './services/orders/order-list.service';

const providers = [
    OrderCreateDTO,
    OrderDetailDTO,
    OrderListDTO,

    OrderCreateService,
    OrderDetailService,
    OrderListService,

    OrderCreatedEventHandler,
];

@Module({
    imports: [
        EventEmitterModule.forRoot({
            wildcard: true,
        }),
        InfraModule
    ],
    providers: providers,
    exports: providers
})
export class AppModule { }
