import { APIException } from "./errorClass";
import { ErrorCode } from "./errorEnum";


// 400 - Richiesta malformata
export class BadRequestException extends APIException {
    constructor(
        message: string,
        errorCode = ErrorCode.INVALID_REQUEST,
        data?: any,
    ) {
        super(message, errorCode, 400, data);
        
    }
}

// 401 - Non autenticato
export class UnauthorizedException extends APIException {
    constructor(
        message: string,
        errorCode = ErrorCode.UNAUTHORIZED,
    ) {
        super(message, errorCode, 401);
    }
}

// 403 - Autorizzazione negata
export class ForbiddenException extends APIException {
    constructor(
        message: string,
        errorCode = ErrorCode.FORBIDDEN,
    ) {
        super(message, errorCode, 403);
    }
}

// 404 - Risorsa non trovata
export class NotFoundException extends APIException {
    constructor(
        message: string,
        errorCode = ErrorCode.NOT_FOUND,
    ) {
        super(message, errorCode, 404);
    }
}

// 422 - Validazione fallita
export class UnprocessableEntity extends APIException {
    constructor(
        message: string,
        errorCode = ErrorCode.INVALID_REQUEST,
    ) {
        super(message, errorCode, 422);
    }
}

// 409 - Conflitto
export class ConflictException extends APIException {
    constructor(
        message: string,
        errorCode = ErrorCode.ALREADY_EXISTS,
    ) {
        super(message, errorCode, 409);
    }
}

// 429 - Troppe richieste
export class TooManyRequestsException extends APIException {
    constructor(
        message: string,
        errorCode = ErrorCode.TOO_MANY_REQUESTS,
    ) {
        super(message, errorCode, 429);
    }
}

// 500 - Errore generico del server
export class InternalServerError extends APIException {
    constructor(
        message: string,
        errorCode = ErrorCode.INTERNAL_SERVER_ERROR,
    ) {
        super(message, errorCode, 500);
    }
}

// 503 - Servizio temporaneamente non disponibile
export class ServiceUnavailable extends APIException {
    constructor(
        message: string,
        errorCode = ErrorCode.SERVICE_UNAVAILABLE,
    ) {
        super(message, errorCode, 503);
    }
}