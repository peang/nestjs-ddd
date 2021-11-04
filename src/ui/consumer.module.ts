import { Module } from '@nestjs/common';
import { AppModule } from '../application/app.module';
import { InfraModule } from '../infra/infra.module';
import { OrderConsumer } from './consumers/order.consumer';

const providers = [];

@Module({
    imports: [
        InfraModule,
        AppModule,
    ],
    controllers: [
        OrderConsumer,
    ],
    providers: providers,
    exports: providers,
})
export class ConsumerModule { }
