import express, { Router, Request, Response } from "express";
import { adminRouter } from "./core/admin/index";
import { startServer } from "./config/server";

const app = express();
export const apiRouter = Router();

app.use(express.json());

app.use('/api', apiRouter);
apiRouter.use('/admin', adminRouter);



startServer(app);


