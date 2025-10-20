import { error } from "console";
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { Role, staffModel } from "../schema/staffSchema";
import { BadRequestException, NotFoundException, UnauthorizedException } from "../errors/errorException";
import { ErrorCode } from "../errors/errorEnum";
import { TokenHeader } from "../schema/loginSchema";
import logger from "../logs/logs";


/**
 * Questi middleware controllano il ruolo dell'utente che ha fatto la richiesta
 * @param req 
 * @param res 
 * @param next 
 */

export const isAdminMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const key = process.env.Secret_Key; //Ottengo la Secret_Key
    if (!key) throw new NotFoundException("Secret_Key non definita", ErrorCode.NOT_FOUND); //ne verifico la validità

    const token = req.headers['authorization'];
    if (!token) throw new UnauthorizedException("Token assente", ErrorCode.TOKEN_MISSING);

    const userToken = token!.split(" ")[1]; // solo il JWT
    if (!userToken) throw new UnauthorizedException("Token non valido", ErrorCode.TOKEN_MISMATCH);

    const user= jwt.verify(userToken,key) as TokenHeader

    const role = await staffModel.findById(user.id).select("role"); //Ottengo il ruolo dell'utente

    if (role && role.role == Role.ADMIN) {
        logger.info(`Ruolo dell'utente ${role._id} (${role.role}) autorizzato | URL: ${req.originalUrl} | Metodo: ${req.method}`);
        next();
    } else throw new UnauthorizedException('Non disponi dei privilegi necessari', ErrorCode.FORBIDDEN);



};



