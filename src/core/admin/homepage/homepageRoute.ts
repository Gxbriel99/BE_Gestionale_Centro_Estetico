import { Router } from "express";
import { loginUser, logoutUser } from "./homepageController";
import { errorHandler } from "../../errors/erorrHandler";

const routes: Router = Router();


routes.post('/login', errorHandler(loginUser)) 
routes.post('/logout', errorHandler(logoutUser)) 


export default routes;