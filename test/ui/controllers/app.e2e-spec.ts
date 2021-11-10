import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { MainModule } from 'src/main.module';
import * as request from 'supertest';

describe('OrderController', () => {
    let app: INestApplication;

    beforeAll(async () => {
        const moduleFixture = await Test.createTestingModule({
            imports: [MainModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    it('/orders (GET)', () => {
        return request(app.getHttpServer())
            .get('/orders')
            .expect(200)
            // .expect('Hello World!');
    });
});
