//* NextFunction is required even if not used
export const errorMiddleware = (error, _req, res, _next) => {
    res.status(error.statusCode).send({
        message: error.message,
        success: false,
        error: error.InternalError,
    });
    return;
};
