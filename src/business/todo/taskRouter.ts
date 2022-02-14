import { Router } from 'express';

import { createTaskSchema } from './taskSchema';
import { schemaValidator } from '../../core/middlewares/validator';
import { getAllTaskHandler, createNewTaskHandler } from './taskController';

const taskRouter = Router();

taskRouter.get('/tasks', getAllTaskHandler);
taskRouter.post('/tasks', schemaValidator(createTaskSchema), createNewTaskHandler);

export default taskRouter;
