import express, { Router, Request, Response } from "express";
import { loginUser } from "./homepageController";
// import { authMiddleware } from "../../middleware/authMiddleware";



const routes: Router = Router();



routes.post('/login',loginUser)

// routes.post('/areaPersonale/', updateEmail)




export default routes;