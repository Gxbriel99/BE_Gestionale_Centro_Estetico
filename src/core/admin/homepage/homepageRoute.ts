import express, { Router, Request, Response } from "express";
import { loginUser, updateEmail } from "./homepageController";
import { tokenMiddleware } from "../../middleware/tokenMiddleware";
import { isAdminMiddleware, isEmployedMiddleware } from "../../middleware/roleMiddleware";
 



const routes: Router = Router();



routes.post('/login',loginUser)

routes.use(tokenMiddleware,isAdminMiddleware)

routes.post('/areaPersonale/changeEmail', updateEmail)




export default routes;