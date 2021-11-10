import { Module } from '@nestjs/common';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { InfraModule } from 'src/infra/infra.module';
import { OrderCreateDTO } from './dtos/orders/order-create.dto';
import { OrderDeleteDTO } from './dtos/orders/order-delete.dto';
import { OrderDetailDTO } from './dtos/orders/order-detail.dto';
import { OrderListDTO } from './dtos/orders/order-list.dto';
import { OrderUpdateDTO } from './dtos/orders/order-update.dto';
import { OrderCreatedEventHandler } from './event-handlers/orders/order-created.event-handler';
import { OrderCreateUseCase } from './use-cases/orders/order-create.use-case';
import { OrderDeleteUseCase } from './use-cases/orders/order-delete.use-case';
import { OrderDetailUseCase } from './use-cases/orders/order-detail.use-case';
import { OrderListUseCase } from './use-cases/orders/order-list.use-case';
import { OrderUpdateUseCase } from './use-cases/orders/order-update.use-case';

const providers = [
    OrderCreateDTO,
    OrderDetailDTO,
    OrderListDTO,
    OrderUpdateDTO,
    OrderDeleteDTO,

    OrderCreateUseCase,
    OrderDetailUseCase,
    OrderListUseCase,
    OrderUpdateUseCase,
    OrderDeleteUseCase,

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
