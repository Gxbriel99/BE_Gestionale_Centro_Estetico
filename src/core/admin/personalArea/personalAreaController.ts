import { Request, Response } from 'express';
import { changeEmail, changePsw } from '../homepage/homepageService';
import { emailSchema, passwordSchema } from '../../schema/loginSchema';



export const updateEmail = async (req: Request, res: Response) => {
    const email = emailSchema.parse(req.body.email)
    const id= req.body._id
    await changeEmail(id,email)
    res.status(200).json({ validation: true, message: 'Il campo email è stato correttamente aggiornato' })
}

export const updatePsw = async (req: Request, res: Response) => {
    const password = passwordSchema.parse(req.body.password)
    const id = req.body._id
    await changePsw(id,password)
    res.status(200).json({ validation: true, message: 'Il campo password è stato correttamente aggiornato' })
}
