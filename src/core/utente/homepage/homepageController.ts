import { Request, Response } from 'express';
import { createUser, loginService } from './homepageService';
import { hashPassword } from './homepageService';
import bcrypt from "bcrypt"; //Hash psw
import { UserModel } from '../../schema/userSchema';


export const addUser = async (req: Request, res: Response) => {
    console.log("Richiesta ricevuta per creare un nuovo utente");

    const user = req.body;

    //Se tutto è ok, salvo l'utente
    try {
        console.log("Dati utente validi, salvataggio in corso...");
        
        user.password = await hashPassword(user.password);

        await createUser(user);

        return res.status(201).json({ validation: true, message: "Utente creato con successo" });
        
    } catch (error) {
        return res.status(500).json({
            validation: false,
            message: "Errore interno del server",
            errore:error
        });
    }
};

export const loginUser = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) return res.status(400).send("Email e password richieste");

        const user = await UserModel.findOne({ email: email });
        if (!user) return res.status(401).send("Email o password errata");

        const passwordValida = await bcrypt.compare(password, user.password);
        if (!passwordValida) return res.status(401).send("Credenziali non valide");

        

        if (user){
            const tokens = await loginService(user);

            const userValido=tokens.payload

            // 🔹 Imposta cookie HTTP-only
            res.cookie('cookieJWT', tokens.cookieJWT, {
                httpOnly: true,
                secure: false, // true se usi HTTPS
                sameSite: 'strict',
                maxAge: 7 * 24 * 60 * 60 * 1000
            });

            // 🔹 Risposta al frontend
            setTimeout(()=>{
                res.status(200).json({
                    validation: true,
                    message: 'Login effettuato con successo',
                    data: userValido
                });
            },2000)
            
        }

    } catch (err) {
        console.error(err);
        res.status(500).send("Errore interno del server");
    }
};

export const settingUser = async (req: Request, res: Response)=>{

    res.send('Sei nella tua area personale')
}
