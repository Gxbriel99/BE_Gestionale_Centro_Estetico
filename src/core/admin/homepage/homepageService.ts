

import { IStaff, staffModel, staffSchema, staffZod } from "../../schema/staffSchema";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import { passwordSchema } from "../../schema/loginSchema";
import { BadRequestException, ConflictException, NotFoundException, UnauthorizedException, UnprocessableEntity } from "../../errors/errorException";
import { ErrorCode } from "../../errors/errorEnum";

/**
 * Funzione effettiva che effettua il login e invia il cookieToken al client
 * @param email email dell'utente
 * @param psw psw dell'utente
 * @returns token & cookieToken
 */

export async function loginService(email: string, psw: string) {
    const data = await staffModel.findOne({ email }).select('_id password').lean();

    if (!data || !(await bcrypt.compare(psw, data.password))) {
        throw new UnauthorizedException('Credenziali non valide', ErrorCode.CONFLICT)
    }
    const key = process.env.Secret_Key;

    if (!key) {
        throw new NotFoundException('SercreTKey non trovata', ErrorCode.NOT_FOUND)
    }

    // payload
    const payload = { id: data._id };

    // Access token breve
    const token = jwt.sign(payload, key, { expiresIn: "15m" });

    // Refresh token
    const cookieToken = jwt.sign(payload, key, { expiresIn: "7d" });

    const user={
        cookieJWT:cookieToken
    }

    await staffModel.findByIdAndUpdate(data.id, user)

    return { token, cookieToken };
}



/**
 * Funzione che cifra la stringa passata
 * @param psw stringa da cifrare 
 * @returns stringa hashata
 */
export async function hashPassword(psw: string) {
    const saltRounds = 10;  // quanto “pesante” vuoi che sia
    const hash = await bcrypt.hash(psw, saltRounds);
    if(!hash)throw new UnprocessableEntity('Errore durante la cifratura della password',ErrorCode.UNPROCESSABLE)
    return hash;
}


