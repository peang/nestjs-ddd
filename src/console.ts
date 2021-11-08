#!/usr/bin/env node

import * as dotenv from 'dotenv';
import { CommandFactory } from 'nest-commander';
import { ConsoleModule } from './ui/console.module';

export default ConsoleModule;
const bootstrap = async () => {
    dotenv.config();
    await CommandFactory.run(ConsoleModule, {
        logger: ['warn', 'error'],
        errorHandler: (err) => {
            console.error(err);
            process.exit(0);
        }
    })
        .finally(() => {
            process.exit(0);
        });
};

bootstrap();