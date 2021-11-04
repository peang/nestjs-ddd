#!/usr/bin/env node

import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import * as dotenv from 'dotenv';
import { ConsumerModule } from './ui/consumer.module';

const bootstrap = async () => {
    console.log('consumer');

    dotenv.config();
    const app = await NestFactory.createMicroservice<MicroserviceOptions>(ConsumerModule, {
        transport: Transport.KAFKA,
        options: {
            client: {
                brokers: ['localhost:29092'],
            },
            consumer: {
                groupId: 'my-kafka-consumer',
            }
        }
    });

    await app.listen();
};

bootstrap();