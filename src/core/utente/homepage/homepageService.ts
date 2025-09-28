
import { Response } from "express";
import { IUser } from "../../schema/userSchema";
import { UserModel } from "../../schema/userSchema"; // il file dove hai definito schema e model
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import { z } from "zod"; //Validazione schema


// Funzione per creare un nuovo utente
export async function createUser(userData: IUser) {
    try {
        //🔹 Schema Zod
        const userSchema = z.object({
            nome: z.string().min(2),
            cognome: z.string().min(2),
            email: z.string().email(),
            password: z.string().min(4),
            isAdmin: z.boolean().nullable().default(false),
            localJWT: z.string().nullable().default(null),      
            coockieJWT: z.string().nullable().default(null),  
            dataLastLog: z.union([z.string(), z.date()]).nullable().default(null),    
        }).strict();

        //🔹 Validazione (parse lancia errore se i dati non rispettano lo schema)
        const validData = userSchema.parse(userData);

        //🔹 Creazione su Mongo solo se valido
        const newUser = await UserModel.create({...validData,});

        return newUser;
    } catch (error: any) {
        if (error.errors) {
            // errore Zod → più leggibile
            throw new Error(`Dati utente non validi: ${JSON.stringify(error.errors)}`);
        }
        throw new Error(`Errore durante la creazione dell'utente: ${error.message}`);
    }
}

export async function loginService(user: IUser) {

    // 🔑 Chiave segreta (VA SEMPRE PRESA DA FILE .ENV MA QUI SERVE PER I TEST)
    const secret = 'S0d!F@rt3ECompl3x@2025';

    // Payload del token
    const payload = { id: user._id, nome: user.nome, isAdmin: user.isAdmin };

    //Genera token (localJWT)
    const localJWT = jwt.sign(payload, secret, { expiresIn: '15m' });

    // 🔹 Genera token (cookieJWT)
    const cookieJWT = jwt.sign(payload, secret, { expiresIn: '7d' });

    // 🔹 Salva i token e dataLastLog 
    user.localJWT = localJWT;
    user.coockieJWT = cookieJWT;
    user.dataLastLog = new Date();
    await user.save();

    return { localJWT, cookieJWT, payload };
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

