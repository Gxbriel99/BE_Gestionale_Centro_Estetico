import { Router } from 'express';
import homepageRoute from './homepage/homepageRoute';
import personalAreaRoute from './personalArea/personalAreaRoute';
import dashboardRoute from './dashboard/dashboardRoute';
import { tokenMiddleware } from '../middleware/tokenMiddleware';
import { isAdminMiddleware } from '../middleware/roleMiddleware';



const adminRouter = Router();

adminRouter.use('/homepage', homepageRoute);

adminRouter.use(tokenMiddleware, isAdminMiddleware)

adminRouter.use('/personalArea',personalAreaRoute )

adminRouter.use('/dashboard',dashboardRoute)

export { adminRouter };