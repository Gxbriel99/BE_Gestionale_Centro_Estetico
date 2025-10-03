import { Router } from "express";
import { updateEmail, updatePsw } from "../personalArea/personalAreaController";
import { errorHandler } from "../../errors/erorrHandler";


const routes: Router = Router();


routes.post('/changeEmail', errorHandler(updateEmail))

routes.post('/changePsw', errorHandler(updatePsw))



export default routes;