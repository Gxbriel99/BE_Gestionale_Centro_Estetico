import { Request, Response } from 'express';
import { extractRefreshToken, loginService, logoutService } from './homepageService';
import { loginZod } from '../../schema/loginSchema';



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


