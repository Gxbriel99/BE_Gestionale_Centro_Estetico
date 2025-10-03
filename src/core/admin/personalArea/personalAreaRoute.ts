import { Router } from "express";
import { updateEmail, updatePsw } from "../personalArea/personalAreaController";


const routes: Router = Router();


routes.post('/changeEmail', updateEmail)

routes.post('/changePsw', updatePsw)



export default routes;