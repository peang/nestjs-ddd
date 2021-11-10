import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Sequelize } from 'sequelize-typescript';
import { Order, OrderSchema } from './models/order.schema';
import { OrderModel } from './models/order.sql';
import { OrderRepository2 } from './repositories/order-repository.sample-schema';

const providers = [
    {
        provide: 'SEQUELIZE',
        useFactory: async () => {
            const sequelize = new Sequelize({
                dialect: 'postgres',
                host: 'localhost',
                port: 5432,
                username: 'irvan',
                password: 'peang',
                database: 'orders',
            });
            sequelize.addModels([OrderModel]);
            // await sequelize.sync();
            return sequelize;
        },
    },
    {
        provide: 'OrderRepositoryInterface',
        useClass: OrderRepository2,
    }
]
@Module({
    imports: [
        MongooseModule.forRoot('mongodb://localhost/nest'),
        MongooseModule.forFeature([
            {
                name: Order.name,
                schema: OrderSchema
            }
        ]),
    ],
    controllers: [],
    providers: providers,
    exports: providers,
})
export class InfraModule { }
