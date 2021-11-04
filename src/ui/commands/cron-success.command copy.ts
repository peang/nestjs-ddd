import { Command, CommandRunner } from 'nest-commander';
import { BaseCommand } from './base.command';

@Command({ name: 'cron-success'})
export class CronSuccessCommand extends BaseCommand implements CommandRunner {
    public async run(passedParams: string[], options?: Record<string, any>): Promise<void> {
        this.start('cron-success');
        
        try {
            this.finish('oke');
        } catch (err) {
            this.fail(JSON.stringify(err));
        }
    }
}