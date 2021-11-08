import { Module } from '@nestjs/common';
import { AppModule } from './application/app.module';
import { InfraModule } from './infra/infra.module';
import { UIModule } from './ui/ui.module';

const providers = [];
@Module({
    imports: [
        UIModule,
        InfraModule,
        AppModule,
    ],
    providers: providers,
})
export class MainModule { }
