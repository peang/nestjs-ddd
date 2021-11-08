#!/usr/bin/env node

import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import * as dotenv from 'dotenv';
import { ConsumerModule } from './ui/consumer.module';

const bootstrap = async () => {
    dotenv.config();
    const brokers: string[] = process.env.PUBSUB_CLIENT_BROKERS.split(',');

    const app = await NestFactory.createMicroservice<MicroserviceOptions>(ConsumerModule, {
        transport: Transport.KAFKA,
        options: {
            client: {
                brokers: brokers,
            },
            consumer: {
                groupId: process.env.PUBSUB_CONSUMER_GROUP_ID,
            }
        }
    });

    await app.listen();
};

bootstrap();