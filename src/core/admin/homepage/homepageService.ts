

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

    const updateUserLogin= await staffModel.findByIdAndUpdate(data.id, user,{new:true})

    if (!updateUserLogin)throw new UnauthorizedException("Errore durante l'aggiornamento dell'email", ErrorCode.UNPROCESSABLE)

    return { token, cookieToken };
}


/**
 * Funzione per aggiornare l'email dell'utente passato
 * @param id id dell'utente
 * @param email emial dell'utente
 */
export async function changeEmail(id: string, email: string) {
    await staffModel.findByIdAndUpdate(id, { $set: { email: email } });
}

/**
 * Funzione per aggiornare l'email dell'utente passato
 * @param id id dell'utente
 * @param password nuova password dell'utente
 */
export async function changePsw(id: string, password: string) {
    const pswHashata = await hashPassword(password)
    await staffModel.findByIdAndUpdate(id, { $set: { password: pswHashata } });
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


