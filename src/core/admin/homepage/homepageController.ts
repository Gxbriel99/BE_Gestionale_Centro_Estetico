import { Request, Response } from 'express';
import { changeEmail, changePsw, checkEmail, checkPsw, loginService } from './homepageService';
import bcrypt from "bcrypt"; //Hash psw
import { staffModel } from '../../schema/staffSchema';


export const loginUser = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) return res.status(400).send("Email e password richieste");

        const user = await staffModel.findOne({ email: email });
        if (!user) return res.status(401).send("Email o password errata");

        const passwordValida = await bcrypt.compare(password, user.password);
        if (!passwordValida) return res.status(401).send("Credenziali non valide");

        if (user) {
            
            const userValido = await loginService(user);

            // Risposta al client
            setTimeout(() => {
                res.status(200).json({
                    validation: true,
                    message: 'Login effettuato con successo',
                    data: userValido.token
                });
            }, 2000)

        }

    } catch (err) {
        console.error(err);
        res.status(500).send("Errore interno del server");
    }
};

export const updateEmail= async (req:Request,res:Response)=>{
    const data= req.body
    const emailValidation: boolean = await checkEmail(data.email)
    if(emailValidation){
        console.log('validazione email:', emailValidation)
        await changeEmail(data._id,data.email)
        res.status(200).json({validation:true, message:'Il campo email è stato correttamente aggiornato'})
    } else res.status(401).json({ validation: false, message: 'Il campo email non è valido' })
}

export const updatePsw= async (req:Request,res:Response)=>{
    const data= req.body
    const pswValidation: boolean = await checkPsw(data.password)

    if(pswValidation){
        console.log(console.log('validazione password:', pswValidation))
        await changePsw(data._id, data.password)
        res.status(200).json({ validation: true, message: 'Il campo password è stato correttamente aggiornato' })
    } else res.status(401).json({ validation: false, message: 'Il campo password non è valido' })
}