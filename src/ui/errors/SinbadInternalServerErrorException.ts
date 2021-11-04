import { HttpException, HttpStatus } from '@nestjs/common';
export class SinbadInternalServerErrorException extends HttpException {
    constructor() {
        super('Tetap Berlayar, Tetap Semangat', HttpStatus.INTERNAL_SERVER_ERROR);
      }
}