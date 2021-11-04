import { Controller, Get, BadRequestException } from '@nestjs/common';

@Controller('logs')
export class LogController {
    @Get('publisher')
    public async logPublisher(): Promise<any> {
        console.log(JSON.stringify({
            logType: "event_publish",
            serviceName: process.env.SERVICE_NAME,
            requestId: 'requestId',
            topicName: 'topicName',
            topicPayload: 'topicPayload',
            timestamp: new Date()
        }));
        return;
    }

    @Get('consumer')
    public async logConsumer(): Promise<any> {
        console.log(JSON.stringify({
            logType: "event_publish",
            serviceName: process.env.SERVICE_NAME,
            requestId: 'requestId',
            topicName: 'topicName',
            topicPayload: 'topicPayload',
            processingTime: 1,
            timestamp: new Date()
        }));
        return;
    }

    @Get('error')
    public async logError(): Promise<any> {
        const error = new BadRequestException();
        console.log(JSON.stringify({
            logType: "event_publish",
            serviceName: process.env.SERVICE_NAME,
            requestId: 'requestId',
            errorType: 'http',
            errorMessage: error.message,
            errorTrace: error.stack,
            timestamp: new Date()
        }));
        return;
    }
}
