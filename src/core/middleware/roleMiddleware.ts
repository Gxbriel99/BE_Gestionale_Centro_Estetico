import { error } from "console";
import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from 'jsonwebtoken';
import { Role, staffModel } from "../schema/staffSchema";
import { BadRequestException, UnauthorizedException } from "../errors/errorException";
import { ErrorCode } from "../errors/errorEnum";


/**
 * Questi middleware controllano il ruolo dell'utente che ha fatto la richiesta
 * @param req 
 * @param res 
 * @param next 
 */

export const  isAdminMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const payload= req.body //Ottengo il payload
    
    if (!payload) throw new BadRequestException('Payload fornito non valido',ErrorCode.INVALID_REQUEST) 

    const role = await staffModel.findById(payload._id).select("role"); //Ottengo il ruolo dell'utente
    
    if (role && role.role == Role.ADMIN) next() 
    else throw new UnauthorizedException('Non disponi dei privilegi necessari', ErrorCode.FORBIDDEN)


};

export const isEmployedMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const payload = req.body.playlaod //Ottengo il payload

    if (!payload) throw new BadRequestException('Payload fornito non valido', ErrorCode.INVALID_REQUEST) 

    const role = await staffModel.findById(payload._id).select("role"); //Ottengo il ruolo dell'utente

    if (role && role.role === Role.EMPLOYED) next() //se e' employed procede
    else throw new UnauthorizedException('Non disponi dei privilegi necessari', ErrorCode.FORBIDDEN)

};

