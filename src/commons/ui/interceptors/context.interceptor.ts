import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { v4 as uuidv4 } from 'uuid';
import { SinbadSetHeaders } from '../decorators/sinbad-header.decorator';

@Injectable()
export class ContextInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const headers = context.switchToHttp().getRequest().headers;

        headers['x-request-id'] =  headers['x-request-id'] ? headers['x-request-id'] : uuidv4();
        SinbadSetHeaders(headers);

        return next
            .handle()
            .pipe(
                tap(),
            )
    }
}