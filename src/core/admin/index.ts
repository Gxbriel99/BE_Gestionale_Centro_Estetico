import { Router } from 'express';
import homepageRoute from './homepage/homepageRoute';
import personalAreaRoute from './personalArea/personalAreaRoute';
import { tokenMiddleware } from '../middleware/tokenMiddleware';
import { isAdminMiddleware } from '../middleware/roleMiddleware';



const adminRouter = Router();

adminRouter.use('/homepage', homepageRoute);

adminRouter.use(tokenMiddleware, isAdminMiddleware)

adminRouter.use('/personalArea',personalAreaRoute )


export { adminRouter };