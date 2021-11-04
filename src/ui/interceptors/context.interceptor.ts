import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class ContextInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        console.log('CONTEXT');
        const headers = context.switchToHttp().getRequest().headers;

        headers['request_id'] = 'ABC';

        return next
            .handle()
            .pipe(
                tap(),
            )
    }
}