import { Router } from "express";
import { loginUser } from "./homepageController";
import { errorHandler } from "../../errors/erorrHandler";

const routes: Router = Router();


routes.post('/login', errorHandler(loginUser)) 


export default routes;