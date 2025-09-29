
import { IUser } from "../../schema/staffSchema";
import { staffModel, staffZod } from "../../schema/staffSchema";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import { z, ZodError } from "zod";




export async function loginService(user: IUser) {

    // 🔑 Chiave segreta (VA SEMPRE PRESA DA FILE .ENV MA QUI SERVE PER I TEST)
    const secret = 'S0d!F@rt3ECompl3x@2025';

    // Payload del token
    const payload = { id: user._id, nome: user.name, role: user.role };

    await user.save();

    return { payload };
}


/**
 * Funzione per validare un email
 * @param email email da validare
 * @returns boolean
 */

export async function checkEmail(email:string):Promise<boolean>{

    
    return true
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

