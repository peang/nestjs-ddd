import { Module } from '@nestjs/common';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { AppModule } from './application/app.module';
import { InfraModule } from './infra/infra.module';
import { ContextInterceptor } from './ui/interceptors/context.interceptor';
import { ErrorInterceptor } from './ui/interceptors/error.interceptor';
import { LoggerInterceptor } from './ui/interceptors/logger.interceptor';
import { UIModule } from './ui/ui.module';

@Module({
    imports: [
        UIModule,
        InfraModule,
        AppModule,
        ThrottlerModule.forRoot({
            ttl: 60,
            limit: 10,
        }),
    ],
    providers: [
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
        },
    ],
})
export class MainModule { }
