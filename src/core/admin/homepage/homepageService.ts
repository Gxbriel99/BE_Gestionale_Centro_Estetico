import { staffModel } from "../../schema/staffSchema";
import bcrypt from "bcrypt";
import { Request } from 'express';
import jwt from 'jsonwebtoken';
import { randomUUID } from 'crypto';
import { BadRequestException, NotFoundException, UnauthorizedException, UnprocessableEntity } from "../../errors/errorException";
import { ErrorCode } from "../../errors/errorEnum";
import { authSessionModel, authSessionZod } from "../../schema/authSesion";
import logger from "../../logs/logs";
import { findUser } from "../personalArea/personalAreaService";
import sesClient from "../../../config/aws-ses";
import { SendEmailCommand } from "@aws-sdk/client-ses";


//----------------------------- LOGIN E LOGOUT ---------------------------------//

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

    logger.info(`Login effettuato da: ${data._id}`);
    
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
    

    // Elimina la sessione per invalidare il token
    await authSessionModel.deleteOne({ entityID: payload.id });
    
    logger.info(`Logout  effettuato da: ${payload.id}`);
    return 
}

//----------------------------- UTILITY ---------------------------------//

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
/**
 * Estrae il token JWT dai cookie della request
 * @param req 
 * @returns token JWT
 */
export function extractRefreshToken(req: Request) {
    if (req.cookies.cookieJWT) return req.cookies.cookieJWT;
    throw new UnauthorizedException("cookieJWT token mancante", ErrorCode.TOKEN_MISSING);
}


/** * Confronta una stringa con il suo hash
 * @param value stringa da confrontare
 * @param hashed stringa hashata
 * @returns true se corrispondono, false altrimenti
*/
export async function compareHash(value: string, hashed: string): Promise<boolean> {
    return bcrypt.compare(value, hashed);
}

//----------------------------- OTP E CHANGE PSW ---------------------------------//

/**
 * Genera e invia un OTP all'email specificata
 * @param email email dell'utente
 * @returns void
 */
export async function requireOTP(email: string) {

    const user= await findUser(email);
    
    if(!user) {
        logger.warn(`Utente con email: ${email} non trovato`);
        throw new NotFoundException('Utente non trovato');
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    await staffModel.findByIdAndUpdate(user._id, {
        $set: { otp, otpExpires: Date.now() + 10 * 60 * 1000 }, // valido 10 minuti
    });

    logger.info(`OTP generato per l'utente con email: ${email}`);

    await sendEmail(email, `Il tuo codice OTP è: ${otp}. Valido per 10 minuti.`);

    return
    
}

/**
 * Valida l'OTP per l'email specificata
 * @param email  email dell'utente
 * @param otp OTP da validare
 * @returns successo della validazione
 */

export async function otpValidation(email: string, otp: string) {

    const user = await findUser(email);

    if (!user) {
        logger.warn(`Tentativo di verifica OTP su utente inesistente con email: ${email}`);
        throw new NotFoundException('Utente non trovato');
    }

    logger.info(`Avvio validazione OTP per utente con id: ${user!._id}`);

    if (!user.otp) {
        logger.warn(`OTP non presente per utente ${email}`);
        throw new BadRequestException('OTP non trovato');
    }

    
    if (user.otpExpires && Date.now() > user.otpExpires.getTime()) {
        logger.warn(`OTP scaduto per utente ${email} (scadenza: ${user!.otpExpires})`);
        throw new UnprocessableEntity('OTP scaduto');
    }

    
    if (otp !== user.otp) {
        logger.warn(`OTP errato per utente ${email}. Inserito: ${otp}, Atteso: ${user.otp}`);
        throw new UnprocessableEntity('OTP non valido');
    }

   
    await staffModel.findByIdAndUpdate(user._id, {
        $set: { otp: null, otpExpires: null }
    });

    logger.info(`OTP verificato con successo per utente: ${user.email}`);

    return { success: true };
}

/**
 * Cambia la password dell'utente dopo aver validato l'OTP
 * @param otp OTP da validare
 * @param email email dell'utente
 * @param password nuova password
 * @return void
*/

export async function changePsw(otp: string,email:string, password: string) {
    const otpValid= await otpValidation(email, otp);

    if(otpValid.success){
        const user= await findUser(email);
        const hashedPsw = await hashPassword(password);
        await staffModel.findByIdAndUpdate(user!._id, { $set: { password: hashedPsw } });
        logger.info(`Password aggiornata per l'utente con email: ${email}`);
    } else {
        logger.warn(`Tentativo di aggiornare la psw fallito per utente: ${email}, OTP non valido`);
        throw new UnprocessableEntity('Impossibile aggiornare la password');
    }
    
}

/**
 * Invia un'email utilizzando AWS SES
 * @param email destinatario dell'email
 * @param message corpo dell'email
 * @returns MessageId dell'email inviata
 */

export async function sendEmail(email: string, message: string) {
    const messageToSend = {
        Source: 'dioelfo90@gmail.com',
        Destination: {
            ToAddresses: [email],
        },
        Message: {
            Subject: {
                Data: 'Test Email from AWS SES',
                Charset: 'UTF-8',
            },
            Body: {
                Text: {
                    Data: message,
                    Charset: 'UTF-8',
                },
            },
        },
    };
    const result = await sesClient.send(new SendEmailCommand(messageToSend));
    logger.info(`Email inviata a: ${email}`);
    return result.MessageId;
}

// export async function validateEmail(email: string) {
//     const sesParams: VerifyEmailIdentityCommandInput = { EmailAddress: email };
//     const command = new VerifyEmailIdentityCommand(sesParams);
//     const result = await sesClient.send(command);
//     console.log('Richiesta di verifica email inviata a:', email);
//     console.log('Request ID:', result.$metadata.requestId);
// }
