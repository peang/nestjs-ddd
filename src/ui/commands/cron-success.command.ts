import { Command, CommandRunner } from 'nest-commander';
import { BaseCommand } from '../../commons/ui/base.command';

@Command({ name: 'cron-success'})
export class CronSuccessCommand extends BaseCommand implements CommandRunner {
    public async run(passedParams: string[], options?: Record<string, any>): Promise<any> {
        return 'SUCCESS';
    }
}