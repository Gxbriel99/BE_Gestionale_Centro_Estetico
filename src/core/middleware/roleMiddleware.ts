import { error } from "console";
import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from 'jsonwebtoken';
import { Role, staffModel } from "../schema/staffSchema";


/**
 * Questi middleware controllano il ruolo dell'utente che ha fatto la richiesta
 * @param req 
 * @param res 
 * @param next 
 */

export const  isAdminMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const payload= req.body //Ottengo il payload
    
    if (!payload) res.status(401).json('Payload non valido') //paylaod non valido

    const role = await staffModel.findById(payload._id).select("role"); //Ottengo il ruolo dell'utente
    

    if (role && role.role == Role.ADMIN) next() 
    else res.status(401).json('Utente non autorizzato') 

    

};

export const isEmployedMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const payload = req.body.playlaod //Ottengo il payload

    if (!payload) res.status(401).json('Payload non valido') //paylaod non valido

    const role = await staffModel.findById(payload._id).select("role"); //Ottengo il ruolo dell'utente

    if (role && role.role === Role.EMPLOYED) next() //se e' employed procede
    else res.status(401).json('Utente non autorizzato') //altrimenti respingi

};

