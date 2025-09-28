import { Router } from 'express';
import homepageRoute from './homepage/homepageRoute';



const userRouter = Router();

userRouter.use('/homepage', homepageRoute);


export { userRouter };