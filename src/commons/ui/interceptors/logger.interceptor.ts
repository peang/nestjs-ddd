import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import * as os from 'os';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { SinbadGetHeaders } from '../decorators/sinbad-header.decorator';

@Injectable()
export class LoggerInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const now = Date.now();

        const req = context.switchToHttp().getRequest();
        const headers = SinbadGetHeaders();
        const method = req.method;
        const body = req.body;

        const requestId = headers['x-request-id'];
        const IP = headers['x-forwarded-for'] ? headers['x-forwarded-for'] : req.socket.remoteAddress;
        const fullPath = req.protocol + '://' + os.hostname() + req.url;

        this.logRequest(
            requestId,
            IP,
            method,
            fullPath,
            headers,
            body
        );

        return next
            .handle()
            .pipe(        
                map((data) => {
                    const processRequest = Date.now() - now;
                    this.logResponse(
                        requestId,
                        method,
                        fullPath,
                        headers,
                        body,
                        processRequest
                    )

                    return data;
                }),
            )
    }

    logRequest(
        requestId: string,
        ip: string,
        method: string,
        fullPath: string,
        headers: Record<string, any>,
        body: Record<string, any>,
    ) {
        const log = {
            logType: "request",
            serviceName: process.env.SERVICE_NAME,
            requestId,
            ip,
            method,
            fullPath,
            headers,
            body,
            timestamp: new Date()
        };

        this.log(log);
    }

    logResponse(
        requestId: string,
        method: string,
        fullPath: string,
        headers: Record<string, any>,
        body: Record<string, any>,
        processingTime: number,
    ) {
        const log = {
            logType: "request",
            serviceName: process.env.SERVICE_NAME,
            requestId,
            method,
            fullPath,
            headers,
            body,
            processingTime,
            timestamp: new Date()
        };

        this.log(log);
    }

    logCron(
        requestId: string,
        cronName: string,
        cronResponse: string,
        cronStatus: 'start' | 'success' | 'failure',
        cronProcessTime: number,
    ) {
        const log = {
            logType: 'cron',
            requestId,
            serviceName: process.env.SERVICE_NAME,
            cronName: cronName,
            cronResponse: cronResponse,
            cronStatus: cronStatus,
            processingTime: cronProcessTime,
            timestamp: new Date()
        };

        this.log(log);
    }

    logConsumer(
        requestId: string,
        topicName: string,
        topicPayload: string,
        processingTime: number,
    ) {
        const log = {
            logType: "event_consume",
            serviceName: process.env.SERVICE_NAME,
            requestId,
            topicName,
            topicPayload,
            processingTime,
            timestamp: new Date()
        }

        this.log(log);
    }

    logError(
        requestId: string,
        processingTime: number,
        errorMessage: string,
        errorTrace: string,
    ) {
        const log = {
            logType: "error",
            requestId,
            serviceName: process.env.SERVICE_NAME,
            errorMessage,
            errorTrace,
            processingTime,
            timestamp: new Date()
        }

        this.log(log);
    }
    
    log(log: Record<string, any>) {
        console.log(JSON.stringify(log));
    }
}