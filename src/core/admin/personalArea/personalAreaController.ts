import { Request, Response } from 'express';
import { changeEmail, changePsw, checkEmail, checkPsw } from '../homepage/homepageService';



export const updateEmail = async (req: Request, res: Response) => {
    const data = req.body
    const emailValidation: boolean = await checkEmail(data.email)
    if (emailValidation) {
        console.log('validazione email:', emailValidation)
        await changeEmail(data._id, data.email)
        res.status(200).json({ validation: true, message: 'Il campo email è stato correttamente aggiornato' })
    } else res.status(401).json({ validation: false, message: 'Il campo email non è valido' })
}

export const updatePsw = async (req: Request, res: Response) => {
    const data = req.body
    const pswValidation: boolean = await checkPsw(data.password)

    if (pswValidation) {
        console.log(console.log('validazione password:', pswValidation))
        await changePsw(data._id, data.password)
        res.status(200).json({ validation: true, message: 'Il campo password è stato correttamente aggiornato' })
    } else res.status(401).json({ validation: false, message: 'Il campo password non è valido' })
}