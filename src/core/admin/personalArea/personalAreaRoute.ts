import { Router } from "express";
import { updateEmail, updatePsw } from "../personalArea/personalAreaController";
import { errorHandler } from "../../errors/erorrHandler";
import { tokenMiddleware } from "../../middleware/tokenMiddleware";
import { isAdminMiddleware } from "../../middleware/roleMiddleware";



const routes: Router = Router();

routes.use(tokenMiddleware, isAdminMiddleware)

routes.post('/changeEmail' ,errorHandler(updateEmail))

routes.post('/changePsw', errorHandler(updatePsw))



export default routes;