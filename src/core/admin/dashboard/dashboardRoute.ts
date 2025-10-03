import { Router } from "express";
import { isAdminMiddleware } from "../../middleware/roleMiddleware";
import { addEmployed } from "./dashboardController";




const routes: Router = Router();


routes.post('/eployed/Add',addEmployed)

export default routes;