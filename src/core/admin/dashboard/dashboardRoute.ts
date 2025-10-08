import { Router } from "express";
import { isAdminMiddleware } from "../../middleware/roleMiddleware";
import { addEmployed, allEmployeds, deleteEmployed, getEmployed, updateEmployed } from "./dashboardController";
import { tokenMiddleware } from "../../middleware/tokenMiddleware";
import { errorHandler } from "../../errors/erorrHandler";




const routes: Router = Router();

routes.use(tokenMiddleware,isAdminMiddleware)

routes.get('/eployed/allEmployed', errorHandler(allEmployeds))
routes.get('/eployed/:id', errorHandler(getEmployed))
routes.post('/eployed/Add', errorHandler(addEmployed))
routes.post('/updateEmployed/:id', errorHandler(updateEmployed))
routes.post('/deleteEmployed/:id', errorHandler(deleteEmployed))

export default routes;