#!/usr/bin/env node

import * as dotenv from 'dotenv';
import { CommandFactory } from 'nest-commander';
import { ConsoleModule } from './ui/console.module';

const bootstrap = async () => {
    dotenv.config();
    await CommandFactory.run(ConsoleModule)
    .catch((err) => {
        console.log(err)
    })
    .finally(() => {
        process.exit(0);
    });
};

bootstrap();