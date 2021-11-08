import { Module } from '@nestjs/common';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { AppModule } from 'src/application/app.module';
import { ContextInterceptor } from 'src/commons/ui/interceptors/context.interceptor';
import { ErrorInterceptor } from 'src/commons/ui/interceptors/error.interceptor';
import { LoggerInterceptor } from 'src/commons/ui/interceptors/logger.interceptor';
import { LogController } from './controllers/log.controller';
import { OrderController } from './controllers/order.controller';
import { OrderDetailRequestAdapter } from './request-adapters/order/order-detail.request-adapter';
import { OrderListRequestAdapter } from './request-adapters/order/order-list.request-adapter';

const providers = [
    OrderListRequestAdapter,
    OrderDetailRequestAdapter
];

@Module({
    controllers: [
        LogController,
        OrderController,
    ],
    imports: [
        AppModule,
        ThrottlerModule.forRoot({
            ttl: 60,
            limit: 10,
        }),
    ],
    providers: [
        ...providers,
        {
            provide: APP_INTERCEPTOR,
            useClass: ContextInterceptor,
        },
        {
            provide: APP_INTERCEPTOR,
            useClass: LoggerInterceptor,
        },
        {
            provide: APP_INTERCEPTOR,
            useClass: ErrorInterceptor,
        },
        {
            provide: APP_GUARD,
            useClass: ThrottlerGuard
        }   
    ],
    exports: providers
})
export class UIModule { }
