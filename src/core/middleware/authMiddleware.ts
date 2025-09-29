import { error } from "console";
import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from 'jsonwebtoken';



export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const accessToken = req.headers.authorization; // Ottengo il bearer token

    if (!accessToken) return { validation: false, error: 'code: IS404'}
        
    const user =
    next();
};

