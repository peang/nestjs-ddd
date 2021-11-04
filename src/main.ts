import { NestFactory } from '@nestjs/core';
import {
    FastifyAdapter,
    NestFastifyApplication
} from '@nestjs/platform-fastify';
import * as dotenv from 'dotenv';
import { MainModule } from './main.module';


async function bootstrap() {
    dotenv.config();
    const app = await NestFactory.create<NestFastifyApplication>(MainModule, new FastifyAdapter());
    await app.listen(
        process.env.NODE_PORT
    );
}

bootstrap();
