import { NextFunction, Response, Request } from "express";
import { AppError } from "../../../application/errors/base-errors.js";

//* NextFunction is required even if not used
export const errorMiddleware = (error: AppError, _req: Request, res: Response, _next: NextFunction) => {
    res.status(error.statusCode).send({
        message: error.message,
        success: false,
        error: error.InternalError,
    });
    return;
};
