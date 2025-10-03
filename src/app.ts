import express, { Router, Request, Response } from "express";
import { adminRouter } from "./core/admin/index";
import { startServer } from "./config/server";
import { errorMiddleware } from "./core/middleware/errorMiddleware";

const app = express();
export const apiRouter = Router();

app.use(express.json());

app.use('/api', apiRouter);
apiRouter.use('/admin', adminRouter);

app.use(errorMiddleware)


startServer(app);


