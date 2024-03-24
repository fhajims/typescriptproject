import { NextFunction, Request, Response } from "express";
import { logger } from "../logger";

export function defaultErrorHandler(
    err, request: Request, response: Response, next: NextFunction) {

    
    
    logger.error(`Default error handler was triggered, reason`, err);

    if (response.headersSent) {
        logger.error(`Response was already written, delegate to default error handling`)
        return next(err);
    }
    
    response.status(500).json({
        status:"error",
        message:"Default error handling triggered"
    })


}