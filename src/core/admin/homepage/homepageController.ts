import { Request, Response } from 'express';
import { changePsw, extractRefreshToken, loginService, logoutService, requireOTP } from './homepageService';
import { emailSchema, loginZod, otpSchema, passwordSchema } from '../../schema/loginSchema';


//----------------------------- LOGIN E LOGOUT ---------------------------------//

export const loginUser = async (req: Request, res: Response) => {
    const { email, password } = loginZod.parse(req.body);
    const user = await loginService(email, password)

    //Assegno il cookie alla response
    res.cookie('cookieJWT', user.cookieToken, {
        httpOnly: true,
        secure: false, //true se usi https in produzione
        sameSite: 'strict',
        maxAge: 7 * 24 * 60 * 60 * 1000
    })

    // Risposta al client
    res.status(200).json({
        validation: true,
        message: 'Login effettuato con successo',
        data: user.token
    });
}

export const logoutUser = async (req: Request, res: Response) => {

    const cookie = await extractRefreshToken(req);
    await logoutService(cookie);
    res.status(200).json({
        validation: true,
        message: 'Logout effettuato con successo'
    });
}

//----------------------------- OTP E CHANGE PSW ---------------------------------//

export const requestOtp = async (req: Request, res: Response) => {
    const email = emailSchema.parse(req.body.email)
    await requireOTP(email)
    res.status(200).json({ validation: true, message: 'Il codice OTP è stato generato e inviato correttamente' })
}

export const updatePSW = async (req: Request, res: Response) => {
    const otp = otpSchema.parse(req.body.otp)
    const email = emailSchema.parse(req.body.email)
    const password = passwordSchema.parse(req.body.password)
    await changePsw(otp,email,password)
    res.status(200).json({ validation: true, message: 'La password è stata aggiornata correttamente' })
}

