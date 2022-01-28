import { Router } from 'express';

import { createNewTask, createSubTask, getAllTask, updateTaskStatus } from '../controller/task';

const taskRouter = Router();

taskRouter.get('/', getAllTask);
taskRouter.post('/', createNewTask);
taskRouter.post('/update', updateTaskStatus);
taskRouter.post('/subTask', createSubTask);

export default taskRouter;
