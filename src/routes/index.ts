import { Router } from 'express';

import tasks from './task';

const appRouter = Router();

appRouter.use('/tasks', tasks);

export default appRouter;
