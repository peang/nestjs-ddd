import { Command, CommandRunner } from 'nest-commander';
import { BaseCommand } from '../../commons/ui/base.command';

@Command({ name: 'cron-fail' })
export class CronFailCommand extends BaseCommand implements CommandRunner {
    public async run(passedParams: string[], options?: Record<string, any>): Promise<any> {
        throw new Error('error')
    }
}