import { staffModel } from "../../schema/staffSchema";
import bcrypt from "bcrypt";
import { Request } from 'express';
import jwt from 'jsonwebtoken';
import { randomUUID } from 'crypto';
import { NotFoundException, UnauthorizedException, UnprocessableEntity } from "../../errors/errorException";
import { ErrorCode } from "../../errors/errorEnum";
import { authSessionModel, authSessionZod } from "../../schema/authSesion";


/**
 * Funzione effettiva che effettua il login e invia il cookieToken al client
 * @param email email dell'utente
 * @param psw psw dell'utente
 * @returns token & cookieToken
 */

export async function loginService(email: string, psw: string) {
    const data = await staffModel.findOne({ email }).select('_id password');

    if (!data || !(await bcrypt.compare(psw, data.password))) {
        throw new UnauthorizedException('Credenziali non valide', ErrorCode.CONFLICT);
    }

    const key = process.env.Secret_Key;
    if (!key) {
        throw new NotFoundException('SecretKey non trovata', ErrorCode.NOT_FOUND);
    }

    const payload = {
        id: data._id,
        jti: randomUUID()
    };

    // JWT
    const token = await jwt.sign(payload, key, { expiresIn: "15m" });
    const cookieToken = await jwt.sign(payload, key, { expiresIn: "7d" });

    const user = {
        cookieJWT: cookieToken
    };

    

    const session = authSessionZod.parse({
        entityID: data._id.toString(),
        token: await hashPassword(payload.jti),
        scadenza: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString()
    });

    // Crea la sessione nel DB
    await authSessionModel.findOneAndUpdate(
        { entityID: data._id.toString() }, // filtro: cerca sessione dell’utente
        session,                           // dati da aggiornare o inserire
        { upsert: true, new: true }        // crea se non esiste, restituisce il nuovo doc
    );


    // Aggiorna lo staff
    await staffModel.findByIdAndUpdate(data._id, user);

    return { token, cookieToken };
}

export async function logoutService(cookieToken: string) {
    const key = process.env.Secret_Key;
    if (!key) throw new NotFoundException("Secret key non trovata", ErrorCode.NOT_FOUND);

    //Verifica la firma e decodifica il token
    const payload = jwt.verify(cookieToken, key) as { id: string; jti: string };

    //Controlla se esiste la sessione nel DB
    const session = await authSessionModel.findOne({ entityID: payload.id });

    if (!session) throw new UnauthorizedException("Sessione non trovata", ErrorCode.UNAUTHORIZED);
    

    // Verifica che il jti del token corrisponda 
    const valid = await compareHash(payload.jti, session.token);
    if (!valid) throw new UnauthorizedException("Token non valido o già invalidato", ErrorCode.UNAUTHORIZED);
    

    // 🧹 Elimina la sessione per invalidare il token
    await authSessionModel.deleteOne({ entityID: payload.id });
    
    return 
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

export function extractRefreshToken(req: Request) {
    if (req.cookies.cookieJWT) return req.cookies.cookieJWT;
    throw new UnauthorizedException("cookieJWT token mancante", ErrorCode.TOKEN_MISSING);
}


export async function compareHash(value: string, hashed: string): Promise<boolean> {
    return bcrypt.compare(value, hashed);
}

