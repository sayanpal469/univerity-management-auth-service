import { Response, Request, NextFunction, ErrorRequestHandler } from "express";
import config from "../config";
import { GenericErrorMessage } from "../interfaces/error";
import handelValidationError from "../errors/ValidationError";
import ApiError from "../errors/ApiError";
import { errorlogger } from "../shared/logger";

const GlobalErrorHandler: ErrorRequestHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    // eslint-disable-next-line no-unused-expressions, no-console
    config.env === 'development' ? console.log('GlobalError', err) : errorlogger.error('Globalerror', err)


    let statusCode = 500;
    let message = 'Something went wrong';
    let errorMessage: GenericErrorMessage[] = [];
    const stack = err.stack;

    if(err?.name === 'ValidatorError') {
        const simplifiedError = handelValidationError(err)
        statusCode = simplifiedError.statusCode
        message = simplifiedError.message
        errorMessage = simplifiedError.errorMessage
    } else if (err instanceof ApiError) {
        statusCode = err?.statusCode
        message = err?.message
        errorMessage = err?.message?
        [
            {
                path: '',
                message: err?.message
            }
        ]: []
    } else if (err instanceof Error) {
        // eslint-disable-next-line no-unused-expressions
        message = err?.message,
        errorMessage = err?.message?
        [
            {
                path: '',
                message: err.message
            }
        ]: []
    }

    res.status(statusCode).json({
        success: false,
        message,
        errorMessage,
        stack: config.env !== 'production' ? stack : undefined,
    })
    next()
};

export default GlobalErrorHandler;