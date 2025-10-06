import { Request, Response, NextFunction } from "express";
import { staffModel } from "../schema/staffSchema";
import jwt from "jsonwebtoken"; // IMPORT NECESSARIO
import { BadRequestException, NotFoundException, UnauthorizedException } from "../errors/errorException";
import { ErrorCode } from "../errors/errorEnum";
import { TokenHeader } from "../schema/loginSchema";

export const tokenMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const accessToken = req.headers.authorization; // Ottengo il bearer token

    if (!accessToken) throw new UnauthorizedException('Token assente', ErrorCode.TOKEN_MISSING)

    if (accessToken) {
        const key = process.env.Secret_Key; //Ottengo la Secret_Key
        if (!key) throw new NotFoundException("Secret_Key non definita", ErrorCode.NOT_FOUND); //ne verifico la validità

        const token = accessToken.split(" ")[1]; // "Rimuovo "Bearer" dal token
        const tokenValidation = jwt.verify(token, key) as TokenHeader; // Controllo validità del token
        

        if (!tokenValidation) throw new UnauthorizedException('Token scaduto',ErrorCode.TOKEN_EXPIRED)

        const user = await staffModel.findById({ _id: tokenValidation.id })
        if (!user) throw new NotFoundException('Utente non trovato', ErrorCode.NOT_FOUND)

        // req.user = {
        //        id: user._id.toString(),
        //        name: user.name,
        //        email: user.email,
        //        role: user.role
        //     };
        next()
    }
};
