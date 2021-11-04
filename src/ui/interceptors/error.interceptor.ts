import { CallHandler, ExecutionContext, HttpException, Injectable, InternalServerErrorException, NestInterceptor } from '@nestjs/common';
import { catchError, Observable } from 'rxjs';
import { SinbadInternalServerErrorException } from '../errors/SinbadInternalServerErrorException';

@Injectable()
export class ErrorInterceptor implements NestInterceptor {
    errorHandler(error) {
        console.log(error)
    }
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        console.log('ERROR');
        return next
            .handle()
            .pipe(
                catchError((err) => {
                    console.log(err);
                    
                    if (err instanceof HttpException) {
                        if (
                            err instanceof InternalServerErrorException
                            ) {
                            // log to sentry before throwing error

                            throw new SinbadInternalServerErrorException();
                        } else {
                            // if other than 5xx not handled

                            throw err;
                        }
                    } else {
                        // log to sentry before throwing error

                        throw new SinbadInternalServerErrorException();
                    }

                }),
            );
    }
}