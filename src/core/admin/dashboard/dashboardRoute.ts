import { Router } from "express";
import { isAdminMiddleware } from "../../middleware/roleMiddleware";
import { addEmployed } from "./dashboardController";
import { tokenMiddleware } from "../../middleware/tokenMiddleware";
import { errorHandler } from "../../errors/erorrHandler";




const routes: Router = Router();

routes.use(tokenMiddleware,isAdminMiddleware)

routes.post('/eployed/Add', errorHandler(addEmployed))

export default routes;