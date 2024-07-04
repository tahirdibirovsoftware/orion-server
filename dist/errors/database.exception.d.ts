import { HttpException } from '@nestjs/common';
export declare class DatabaseException extends HttpException {
    constructor(message: string);
}
