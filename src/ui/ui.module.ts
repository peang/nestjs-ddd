import { Module } from '@nestjs/common';
import { AppModule } from 'src/application/app.module';
import { LogController } from './controllers/log.controller';
import { OrderController } from './controllers/order.controller';
import { OrderDetailRequestAdapter } from './request-adapters/order/order-detail.request-adapter';
import { OrderListRequestAdapter } from './request-adapters/order/order-list.request-adapter';

const providers = [
    OrderListRequestAdapter,
    OrderDetailRequestAdapter,
];

@Module({
    controllers: [
        LogController,
        OrderController,
    ],
    imports: [AppModule],
    providers: providers,
    exports: providers
})
export class UIModule { }
