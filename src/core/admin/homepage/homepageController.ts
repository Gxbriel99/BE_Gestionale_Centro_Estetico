import { Request, Response } from 'express';
import { loginService } from './homepageService';
import { hashPassword } from './homepageService';
import bcrypt from "bcrypt"; //Hash psw
import { z } from "zod";
import { emailSchema, staffModel } from '../../schema/staffSchema';



export const loginUser = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) return res.status(400).send("Email e password richieste");

        const user = await staffModel.findOne({ email: email });
        if (!user) return res.status(401).send("Email o password errata");

        const passwordValida = await bcrypt.compare(password, user.password);
        if (!passwordValida) return res.status(401).send("Credenziali non valide");



        if (user) {
            const tokens = await loginService(user);

            const userValido = tokens.payload


            // 🔹 Risposta al frontend
            setTimeout(() => {
                res.status(200).json({
                    validation: true,
                    message: 'Login effettuato con successo',
                    data: userValido
                });
            }, 2000)

        }

    } catch (err) {
        console.error(err);
        res.status(500).send("Errore interno del server");
    }
};


