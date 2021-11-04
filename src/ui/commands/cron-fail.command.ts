import { Command, CommandRunner } from 'nest-commander';
import { BaseCommand } from './base.command';

@Command({ name: 'cron-fail'})
export class CronFailCommand extends BaseCommand implements CommandRunner {
    public async run(passedParams: string[], options?: Record<string, any>): Promise<void> {
        this.start('cron-fail');
        
        try {
            throw new Error();
        } catch (err) {
            this.fail(JSON.stringify(err));
        }
    }
}