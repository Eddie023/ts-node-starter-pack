import { Router } from 'express';

import taskRouter from '../domain/todo/taskRouter';

const version1Routes = Router();

/**
 * Add all v1 routes here.
 */
version1Routes.use(taskRouter);

export default version1Routes;
