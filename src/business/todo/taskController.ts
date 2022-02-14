import { StatusCodes } from 'http-status-codes';
import { Request, Response, NextFunction } from 'express';

import * as taskService from './taskService';

/**
 * Get the list of all available task.
 *
 * @param req
 * @param res
 * @param next
 */
export function getAllTaskHandler(req: Request, res: Response, next: NextFunction): void {
  taskService
    .getAllTask()
    .then((data) => res.json(data))
    .catch((err) => next(err));
}

/**
 * Get the list of all available task.
 *
 * @param req
 * @param res
 * @param next
 */
export function createNewTaskHandler(req: Request, res: Response, next: NextFunction): void {
  taskService
    .createNewTask(req.body)
    .then((data) => res.status(StatusCodes.CREATED).json(data))
    .catch((err) => next(err));
}
