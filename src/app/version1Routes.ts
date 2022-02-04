import { Router } from 'express';

import taskRouter from '../domain/todo/taskRouter';

const version1Routes = Router();

version1Routes.use('/tasks', taskRouter);

export default version1Routes;
