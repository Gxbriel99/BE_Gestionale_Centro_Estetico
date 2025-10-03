import { Router } from "express";
import { loginUser } from "./homepageController";
 



const routes: Router = Router();



routes.post('/login',loginUser) 






export default routes;