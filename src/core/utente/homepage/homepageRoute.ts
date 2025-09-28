import express, { Router, Request, Response } from "express";
import { addUser, loginUser, settingUser } from "./homepageController";
import { authMiddleware } from "../../middleware/authMiddleware";



const routes: Router = Router();

routes.post("/register", addUser);

routes.post('/login',loginUser)

routes.get('/areaPersonale', authMiddleware,settingUser)




export default routes;