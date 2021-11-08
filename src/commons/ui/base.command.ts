import { LoggerInterceptor } from 'src/commons/ui/interceptors/logger.interceptor';
import { v4 as uuidv4 } from 'uuid';

export class BaseCommand {
    constructor() {
        return new Proxy(this, {
            get(target, prop) {
                if (typeof target[prop] === 'function') {
                    return new Proxy(target[prop], {
                        apply: (target, thisArg, argumentsList) => {
                            const cronName = thisArg.constructor.name
                            const requestId = uuidv4();
                            const logger = new LoggerInterceptor();
                            const processTimeStart = Date.now();

                            logger.logCron(
                                requestId,
                                cronName,
                                null,
                                'start',
                                null,
                            )

                            return Reflect.apply(target, thisArg, argumentsList)
                                .then((res) => {
                                    const processTimeEnd = Date.now();
                                    const processTime = processTimeEnd - processTimeStart;

                                    logger.logCron(
                                        requestId,
                                        cronName,
                                        res,
                                        'success',
                                        processTime,
                                    )
                                })
                                .catch((err) => {
                                    const processTimeEnd = Date.now();
                                    const processTime = processTimeEnd - processTimeStart;

                                    logger.logCron(
                                        requestId,
                                        cronName,
                                        err.stack,
                                        'failure',
                                        processTime,
                                    )
                                });
                        }
                    });
                } else {
                    return Reflect.get(target, prop);
                }
            }
        });
    }
}