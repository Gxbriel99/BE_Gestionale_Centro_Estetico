import { Request, Response } from 'express';
import { checkEmail, checkPsw, loginService } from './homepageService';
import bcrypt from "bcrypt"; //Hash psw
import { staffModel } from '../../schema/staffSchema';


export const loginUser = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        const emailValidation= await checkEmail(email)
        const pswValidation = await checkPsw(password)

        if (!emailValidation || !pswValidation) return res.status(401).json('credenziali non valide')

        const user = await staffModel.findOne({ email: email });

        if (!user) return res.status(401).send("Utente non valido");

        const pswCheck = await bcrypt.compare(password, user.password);

        if (pswCheck) {

            //effettuo il login
            const userValido = await loginService(user);

            //Assegno il cookie alla response
            res.cookie('cookieJWT', userValido.cookieToken, {
                httpOnly: true,
                secure: true, //true se usi https
                sameSite: 'strict',
                maxAge: 7 * 24 * 60 * 60 * 1000
            })

            // Risposta al client
            setTimeout(() => {
                res.status(200).json({
                    validation: true,
                    message: 'Login effettuato con successo',
                    data: userValido.token
                });
            }, 2000)

        } else return res.status(401).json("Errore durante il tentativo d'accesso")

    } catch (err) {
        console.error(err);
        res.status(500).send("Errore interno del server");
    }
};

