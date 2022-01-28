import { Request, Response, NextFunction } from 'express';

import { Task } from '../model/task';

/**
 * Get the list of all available task.
 *
 * @param req
 * @param res
 * @param next
 */
export function getAllTask(req: Request, res: Response, next: NextFunction) {
  const task = new Task();

  task
    .getAllTask()
    .then((data) => res.json(data))
    .catch((err) => next(err));
}

/**
 * Create new task.
 *
 * @param req
 * @param res
 * @param next
 */
export function createNewTask(req: Request, res: Response, next: NextFunction) {
  const task = new Task();
  const { title } = req.body;

  task
    .createNewTask(title)
    .then((data) => res.json(data))
    .catch((err) => next(err));
}

/**
 * Update task status.
 *
 * @param req
 * @param res
 * @param next
 */
export function updateTaskStatus(req: Request, res: Response, next: NextFunction) {
  const task = new Task();
  const { taskId, status } = req.body;

  task
    .updateTaskStatus(taskId, status)
    .then((data) => res.json(data))
    .catch((err) => next(err));
}

/**
 * Create subTask.
 *
 * @param req
 * @param res
 * @param next
 */
export function createSubTask(req: Request, res: Response, next: NextFunction) {
  const task = new Task();
  const { taskId, title } = req.body;

  console.log('the req.body is', req.body);

  task
    .createSubTask(taskId, title)
    .then((data) => res.json(data))
    .catch((err) => next(err));
}
