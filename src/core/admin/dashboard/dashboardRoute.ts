import { Router } from "express";
import { isAdminMiddleware } from "../../middleware/roleMiddleware";
import { addCustomer, addEmployed, addService, allCustomer, allEmployeds, allService, deleteCustomer, deleteEmployed, deleteService, updateCustomer, updateEmployed, updateService } from "./dashboardController";
import { tokenMiddleware } from "../../middleware/tokenMiddleware";
import { errorHandler } from "../../errors/erorrHandler";




const routes: Router = Router();

routes.use(tokenMiddleware)

//-----------------------CRUD CUSTOMER--------------------------------------//
routes.get('/allCustomers', errorHandler(allCustomer))
routes.post('/addCustomer', errorHandler(addCustomer))
routes.post('/updateCustomer/:id', errorHandler(updateCustomer))
routes.post('/deleteCustomer/:id', errorHandler(deleteCustomer))

//-----------------------CRUD EMPLOYED--------------------------------------//
routes.use(isAdminMiddleware)

routes.get('/allEmployed', errorHandler(allEmployeds))
routes.post('/addEmployed', errorHandler(addEmployed))
routes.post('/updateEmployed/:id', errorHandler(updateEmployed))
routes.post('/deleteEmployed/:id', errorHandler(deleteEmployed))

//-----------------------CRUD SERVICE--------------------------------------//
routes.get('/allService', errorHandler(allService))
routes.post('/addService', errorHandler(addService))
routes.post('/updateService/:id', errorHandler(updateService))
routes.post('/deleteService/:id', errorHandler(deleteService))


export default routes;