import { v4 } from 'uuid';
import { LoggerInterceptor } from '../interceptors/logger.interceptor';
export class BaseCommand {
    public requestId: string;

    protected logger: LoggerInterceptor;
    protected processTimeStart: number;
    protected processTimeEnd: number;
    protected processTime: number;
    protected cronName: string;

    start(
        cronName: string,
    ) {
        if (!cronName) {
            throw new Error('Cron Name Not Set');
        }
        this.requestId = v4();
        this.cronName = cronName;
        this.logger = new LoggerInterceptor();
        this.processTimeStart = Date.now();

        this.logger.logCron(
            this.requestId,
            this.cronName,
            '',
            'start',
            this.processTime,
        )
    }

    finish(cronResponse: string) {
        if (!cronResponse) {
            throw new Error('Make Sure Log Your Response After Cron Finish');
        }

        this.processTimeEnd = Date.now();
        this.processTime = this.processTimeEnd - this.processTimeStart;

        this.logger.logCron(
            this.requestId,
            this.cronName,
            cronResponse,
            'success',
            this.processTime,
        )
    }

    fail(cronError: string) {
        if (!cronError) {
            throw new Error('Make Sure Log Your Response After Cron Finish');
        }

        this.processTimeEnd = Date.now();
        this.processTime = this.processTimeEnd - this.processTimeStart;

        this.logger.logCron(
            this.requestId,
            this.cronName,
            cronError,
            'failure',
            this.processTime,
        )
    }
}