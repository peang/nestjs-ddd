import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ErrorInterceptor } from 'src/commons/ui/interceptors/error.interceptor';
import { PubsubContextInterceptor } from 'src/commons/ui/interceptors/pubsub-context.interceptor';
import { PubsubLoggerInterceptor } from 'src/commons/ui/interceptors/pubsub-logger.interceptor';
import { AppModule } from '../application/app.module';
import { InfraModule } from '../infra/infra.module';
import { OrderConsumer } from './consumers/order.consumer';

const providers = [
    {
        provide: APP_INTERCEPTOR,
        useClass: PubsubContextInterceptor,
    },
    {
        provide: APP_INTERCEPTOR,
        useClass: PubsubLoggerInterceptor,
    },
    {
        provide: APP_INTERCEPTOR,
        useClass: ErrorInterceptor,
    },
];

@Module({
    imports: [
        InfraModule,
        AppModule,
    ],
    controllers: [
        OrderConsumer,
    ],
    providers: providers,
    // exports: providers,
})
export class ConsumerModule { }
