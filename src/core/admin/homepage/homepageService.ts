
import { emailSchema, IUser } from "../../schema/staffSchema";
import { staffModel, staffZod } from "../../schema/staffSchema";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import { z, ZodError } from "zod";




export async function loginService(user: IUser) {

    // 🔑 Chiave segreta 
    const key = process.env.Secret_Key;

    // Payload del token
    const payload = { id: user._id, nome: user.name, role: user.role };

    // Genera il token JWT
    //expiresIn fa scadere il token MA NON LO ELIMINA
    const token = jwt.sign(payload, key as string, { expiresIn: '15m' }); 

    await user.save();

    return { token };
}


/**
 * Funzione per validare un email
 * @param email email da validare
 * @returns boolean
 */

export async function checkEmail(email: string): Promise<boolean> {
    try {
        emailSchema.parse(email);
        return true;
    } catch (e) {
        return false;
    }
}

// funzione fare l'hash della psw
export async function hashPassword(psw: string): Promise<string> {
    try {
        const saltRounds = 10;  // quanto “pesante” vuoi che sia
        const hash = await bcrypt.hash(psw, saltRounds);
        return hash;
    } catch (err) {
        throw new Error(`Errore durante l'hashing della password: ${err}`);
    }
}

