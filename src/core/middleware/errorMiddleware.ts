
import { Request, Response, NextFunction } from "express";
import { APIException } from "../errors/errorClass";

/**
 * Middleware globale per la gestione centralizzata degli errori API.
 * Differenzia tra errori client ed errori server 
 */
export const errorMiddleware = (error: APIException, req: Request, res: Response, next: NextFunction) => {

    const isClientError = error.statusCode >= 400 && error.statusCode < 500;

    console.log("DEBUG ERROR:", error);

    if (isClientError) {

        const responseBody: any = {
            success: false,
            message: error.message,
            errorCode: error.errorCode
        };

        // Se ci sono dati, includili nella risposta
        if (error.data) {
            responseBody.data = error.data;
        }
        res.status(error.statusCode).json(responseBody);

    } else {
        res.status(error.statusCode).json({
            success: false,
            message: error.message,
            errorCode: error.errorCode,
        });
    }
};