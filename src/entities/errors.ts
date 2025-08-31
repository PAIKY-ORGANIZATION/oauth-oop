export class AppError extends Error {
    message;
    statusCode;
    InternalError;
    constructor(message: string, statusCode: number, InternalError: any) {
        super(message);
        this.message = message;
        this.statusCode = statusCode;
        this.InternalError = InternalError;
    }
}


export class BadRequest extends AppError {
    message;
    constructor(message: string) {
        super(message, 400, null);
        this.message = message;
    }
}


export declare class UnprocessableEntity extends AppError {
    message: any;
    constructor(message: any);
}


export class InternalException extends AppError {
    message;
    error;
    constructor(message: string, error: any) {
        super(message, 500, error);
        this.message = message;
        this.error = error;
    }
}


export class Unauthorized extends AppError {
    message;
    constructor(message: string) {
        super(message, 401, null);
        this.message = message;
    }
}
