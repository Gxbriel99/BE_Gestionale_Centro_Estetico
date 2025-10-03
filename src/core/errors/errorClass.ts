import { ErrorCode } from "./errorEnum";


/**
 * Classe base per tutte le eccezioni dell'API.
 * Estende la classe nativa Error aggiungendo:
 * - Codice errore personalizzato
 * - Status code HTTP
 * - Dettagli dell'errore
 */


export class APIException extends Error {
    public readonly errorCode: ErrorCode;
    public readonly statusCode: number;
    public readonly data?: any;

    constructor(
        message: string,
        errorCode: ErrorCode,
        statusCode: number,
        data?: any,
    ) {
        super(message);
        this.errorCode = errorCode;
        this.statusCode = statusCode;
        this.data = data;
    }
}