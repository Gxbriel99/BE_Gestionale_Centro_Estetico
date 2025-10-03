import { Request, Response, NextFunction } from "express";
import { staffModel } from "../schema/staffSchema";
import jwt from "jsonwebtoken"; // IMPORT NECESSARIO

export const tokenMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const accessToken = req.headers.authorization; // Ottengo il bearer token

    if (!accessToken) return { validation: false, error: 'code: IS402' } // token assente

    if (accessToken) {
        try {
            const key = process.env.Secret_Key; //Ottengo la Secret_Key
            if (!key) throw new Error("Secret_Key non definita"); //ne verifico la validità

            const token = accessToken.split(" ")[1]; // "Rimuovo "Bearer" dal token
            const tokenValidation =jwt.verify(token, key); // Controllo validità del token

            if(tokenValidation){
                const payload = req.body
                const user = await staffModel.findById({ _id: payload._id })
                if (user) {
                    next()
                } else {
                    res.status(401).json('Utente non valido')
                }
            }

        } catch (err: any) {
            if (err.name === "TokenExpiredError") {
                return res.status(401).json({ validation: false, error: 'code: IS404' }); //Token scaduto
            }
            // Qui viene intercettato qualsiasi token non valido
            return res.status(401).json({ validation: false, error: 'code: IS403' }); //Token non valido
        }
    } else {
        return res.status(401).json({ validation: false, error: 'code: IS401' }); // Token Assente
    }
};
