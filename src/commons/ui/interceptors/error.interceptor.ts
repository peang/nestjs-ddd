import { CallHandler, ExecutionContext, HttpException, Injectable, InternalServerErrorException, NestInterceptor } from '@nestjs/common';
import { catchError, Observable } from 'rxjs';
import { SinbadInternalServerErrorException } from 'src/commons/ui/errors/SinbadInternalServerErrorException';
import { SinbadGetHeaders } from '../decorators/sinbad-header.decorator';
import { LoggerInterceptor } from './logger.interceptor';

@Injectable()
export class ErrorInterceptor implements NestInterceptor {
    private logger: LoggerInterceptor;

    constructor() {
        this.logger = new LoggerInterceptor();
    }

    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const now = Date.now();

        return next
            .handle()
            .pipe(
                catchError((err) => {                    
                    const processRequest = Date.now() - now;
                    const headers = SinbadGetHeaders();

                    this.logger.logError(
                        headers.requestId,
                        processRequest,
                        err.message,
                        JSON.stringify(err.stack)
                    )
                    if (err instanceof HttpException) {
                        if (
                            err instanceof InternalServerErrorException
                        ) {
                            throw new SinbadInternalServerErrorException();
                        } else {
                            throw err;
                        }
                    } else {
                        throw new SinbadInternalServerErrorException();
                    }
                }),
            );
    }
}