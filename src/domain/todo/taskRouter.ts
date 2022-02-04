import { Router } from 'express';

import { getAllTaskHandler } from './taskController';

const taskRouter = Router();

taskRouter.get('/', getAllTaskHandler);

export default taskRouter;
