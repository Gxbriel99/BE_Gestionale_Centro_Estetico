import { Router } from "express";
import { isAdminMiddleware } from "../../middleware/roleMiddleware";
import { addEmployed, deleteEmployed, updateEmployed } from "./dashboardController";
import { tokenMiddleware } from "../../middleware/tokenMiddleware";
import { errorHandler } from "../../errors/erorrHandler";




const routes: Router = Router();

routes.use(tokenMiddleware,isAdminMiddleware)

routes.post('/eployed/Add', errorHandler(addEmployed))
routes.post('/eployed/Update', errorHandler(updateEmployed))
routes.post('/eployed/Delete', errorHandler(deleteEmployed))

export default routes;