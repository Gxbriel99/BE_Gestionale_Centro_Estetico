import { Request, Response, NextFunction } from "express";
import { staffModel } from "../schema/staffSchema";
import jwt from "jsonwebtoken"; // IMPORT NECESSARIO
import { NotFoundException, UnauthorizedException } from "../errors/errorException";
import { ErrorCode } from "../errors/errorEnum";
import { TokenHeader } from "../schema/loginSchema";
import logger from "../logs/logs";

export const tokenMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const accessToken = req.headers.authorization; // Ottengo il bearer token

    if (!accessToken) {
        logger.error({ url: req.originalUrl, method: req.method }, 'Token assente');
        throw new UnauthorizedException('Token assente', ErrorCode.TOKEN_MISSING);
    }


    if (accessToken) {
        const key = process.env.Secret_Key; //Ottengo la Secret_Key
        if (!key) {
            logger.error({ url: req.originalUrl, method: req.method }, 'Secret_Key non definita');
            throw new NotFoundException("Secret_Key non definita", ErrorCode.NOT_FOUND);
        }


        const token = accessToken.split(" ")[1]; // "Rimuovo "Bearer" dal token
        const tokenValidation = jwt.verify(token, key) as TokenHeader; // Controllo validità del token


        if (!tokenValidation) {
            logger.error({ url: req.originalUrl, method: req.method }, 'Token scaduto');
            throw new UnauthorizedException('Token scaduto', ErrorCode.TOKEN_EXPIRED);
        }


        const user = await staffModel.findById({ _id: tokenValidation.id })
        if (!user) {
            logger.error({ url: req.originalUrl, method: req.method }, 'Utente non trovato');
            throw new NotFoundException('Utente non trovato', ErrorCode.NOT_FOUND);
        }


        // Log informativo dell'utente autenticato
        logger.info({ userId: tokenValidation.id, url: req.originalUrl, method: req.method }, 'Token valido, utente autenticato');
        next()

    }
};
