import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { SinbadGetHeaders } from '../decorators/sinbad-header.decorator';
import { LoggerInterceptor } from './logger.interceptor';

@Injectable()
export class PubsubLoggerInterceptor extends LoggerInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const now = Date.now();

        const req = context.switchToRpc().getData();
        const headers = SinbadGetHeaders();

        return next
            .handle()
            .pipe(
                map((data) => {
                    const processRequest = Date.now() - now;
                    this.logConsumer(
                        headers.requestId,
                        req.topic,
                        JSON.stringify({
                            key: req.key,
                            value: req.value,
                        }),
                        processRequest,
                    );

                    return data;
                }),
            )
    }
}