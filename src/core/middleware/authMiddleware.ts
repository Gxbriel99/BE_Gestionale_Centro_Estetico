import { error } from "console";
import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from 'jsonwebtoken';



export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const localToken = req.headers.authorization; // Ottengo il bearer token

    if (!localToken) return res.status(401).json({ message: 'Token assente' });

    //Estrazione token rimuovendo 'Bearer '
    const token = localToken.split(' ')[1];

    try {
        //Stessa secret del login(andrebbe quella del file .env)
        //Dico a TypeScript che payload è un JwtPayload 
        const payload = jwt.verify(token, 'S0d!F@rt3ECompl3x@2025') as JwtPayload & { isAdmin?: boolean };;
        console.log(payload)
        next();
    } catch (err) {
        return res.status(401).json({ message: 'Token non valido',errore:error }); // blocco se non valido
    }

};

