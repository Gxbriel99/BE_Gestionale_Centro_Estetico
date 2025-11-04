import { Router } from "express";
import { loginUser, logoutUser, requestOtp, updatePSW } from "./homepageController";
import { errorHandler } from "../../errors/erorrHandler";


const routes: Router = Router();


routes.post('/login', errorHandler(loginUser)) 
routes.post('/logout', errorHandler(logoutUser)) 

routes.post('/sendOTP', errorHandler(requestOtp))
routes.post('/changePsw', errorHandler(updatePSW))

// routes.post('/sendEmailAWS', errorHandler(test))
// routes.post('/verifyEmailAWS', errorHandler(verifyEmail))

export default routes;