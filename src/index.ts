import express, { Router,Request,Response } from "express";
import { userRouter } from "./core/utente/index";
import { startServer } from "./config/server";

const app = express();
export const apiRouter = Router();

app.use(express.json());

app.use('/api', apiRouter);
apiRouter.use('/user', userRouter);



startServer(app);


