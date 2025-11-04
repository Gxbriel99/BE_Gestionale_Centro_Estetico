import { Request, Response } from 'express';
import { emailSchema, otpSchema, passwordSchema } from '../../schema/loginSchema';
import { changeEmail,findUser } from './personalAreaService';
import { staffModel } from '../../schema/staffSchema';
import { email, string } from 'zod';
import { sendEmail } from '../homepage/homepageService';


export const updateEmail = async (req: Request, res: Response) => {
    const email = emailSchema.parse(req.body.email)
    const id = req.body._id
    await changeEmail(id, email)
    res.status(200).json({ validation: true, message: 'Il campo email è stato correttamente aggiornato' })
}


export const test = async (req: Request, res: Response) => {
    const user= await findUser(req.body.email);
    const message = req.body.message
    
    const result = await sendEmail(user!.email, message)
    res.status(200).json({ messageId: result })
}

// export const verifyEmail = async (req: Request, res: Response) => {
//     const email = req.body.email
//     const result = await validateEmail(email)
//     res.status(200).json({ messageId: result })
// }


