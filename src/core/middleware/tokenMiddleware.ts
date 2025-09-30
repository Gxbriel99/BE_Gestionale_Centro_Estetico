import { Request, Response, NextFunction } from "express";
import { staffModel } from "../schema/staffSchema";

/**
 * Questo middleware controlla il token dell'utente che ha fatto la richiesta
 * @param req 
 * @param res 
 * @param next 
 */
export const  tokenMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const accessToken = req.headers.authorization; // Ottengo il bearer token

    if (!accessToken) return { validation: false, error: 'code: IS404'} //token assente
        
    if(accessToken){
        const payload= req.body
        const user = await staffModel.findById({_id:payload._id})
        if(user){
            next() 
        }else{
            res.status(401).json('Utente non autorizzato')
        }
    } else return { validation: false, error: 'code: IS401' } //Sessione scaduta
    
};

