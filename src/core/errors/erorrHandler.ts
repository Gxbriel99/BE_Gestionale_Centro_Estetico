import { ZodError } from "zod";
import { NextFunction, Request, Response } from "express";
import { APIException } from "./errorClass";
import { ErrorCode } from "./errorEnum";
import { BadRequestException, InternalServerError } from "./errorException";


/**
 * function che avvolge i controller Express
 * e cattura gli errori per passarli al middleware di gestione errori.
 *
 * Evita di dover scrivere `try/catch` in ogni controller
 * Uniforma la gestione delle eccezioni
 * 
 * @param controller controller
 */
export const errorHandler = (controller: Function) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            //Prova a esguire il controller
            await controller(req, res, next);
        } catch (error) {
            // Converte l'errore in'APIException 
            next(toAPIException(error));
        }
    };
};

/**
 * Converte errori generici in `APIException` per fornire
 * una risposta API coerente.
 *
 * Logica:
 * 1. Se è già un'APIException la restituisce senza modifiche
 * 2. Se è un errore di validazione Zod lo converte in BadRequestException
 * 3. Altrimenti ritorna un InternalServerError
 */
function toAPIException(error: any) {

    if (error instanceof APIException) return error;

    if (error instanceof ZodError) {
        return handleZodError(error);
    }

    return new InternalServerError(error.message, ErrorCode.INTERNAL_SERVER_ERROR);
};

/**
 * Converte un errore di validazione Zod in `BadRequestException`
 * includendo i dettagli (campo e messaggio) per ogni violazione.
 */
function handleZodError(error: ZodError) {
    const data = error.issues.map(issue => ({
        field: issue.path.join('.'),
        message: issue.message
    }));
    return new BadRequestException('Errore di validazione dei dati.', ErrorCode.INVALID_REQUEST, data);
}