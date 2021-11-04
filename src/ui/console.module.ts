import { Module } from '@nestjs/common';
import { AppModule } from '../application/app.module';
import { InfraModule } from '../infra/infra.module';
import { MainModule } from '../main.module';
import { CronFailCommand } from './commands/cron-fail.command';
import { CronSuccessCommand } from './commands/cron-success.command';
import { OrderCommand } from './commands/order.command';
import { UIModule } from './ui.module';

const providers = [
    CronSuccessCommand,
    CronFailCommand,
    OrderCommand,
];

@Module({
    imports: [
        MainModule,
        UIModule,
        InfraModule,
        AppModule,
    ],
    providers: providers,
    exports: providers,
})
export class ConsoleModule { }
