import { Connection } from 'typeorm';
import createError from 'http-errors';
import camelize, { Camelize } from 'camelize-ts';

// import TaskEntity from '../entities/Task';
import { createDbConnection, logger } from '../core/utils';
import { GET_ALL_TASKS } from '../queries/get_all_task';

interface Success<T> {
  data?: Camelize<T> | Camelize<T[]>;
  message: string;
}

interface TaskDetails {
  id: number;
  title: string;
  status: string;
  createdAt: string;
  subTask: TaskDetails[];
}

export class Task {
  static connection: null | Connection = null;

  constructor() {
    const tableName = 'task';
  }

  async createConnection(): Promise<Connection> {
    Task.connection = await createDbConnection();

    return Task.connection;
  }

  async getTaskRepository() {
    let conn;
    if (Task.connection === null) {
      conn = await this.createConnection();
    } else {
      conn = Task.connection;
    }

    // return conn.getRepository(TaskEntity);
  }

  /**
   * Get all task and it's associated subTasks.
   *
   * @returns {Promise<Success<TaskDetails | string>>}
   */
  public async getAllTask(): Promise<Success<TaskDetails | string>> {
    try {
      const taskRepo = await this.getTaskRepository();

      logger.info('Fetching all tasks with associated subTasks');
      const result = await taskRepo.query(GET_ALL_TASKS);

      return {
        data: camelize(result),
        message: 'List of tasks',
      };
    } catch (error) {
      logger.error('Error fetching all tasks with err: ', error);

      throw new Error('Failed to fetch all tasks');
    }
  }

  public async createNewTask(title: string): Promise<any> {
    try {
      const taskRepo = await this.getTaskRepository();

      const result = await taskRepo.insert({
        title,
      });

      if (!result) {
        logger.error('Failed to insert new task');

        throw new Error('Failed to insert');
      }

      logger.info(`Added new task with title: ${title}`);

      return {
        data: camelize(result.raw),
        message: 'List of tasks',
      };
    } catch (error) {
      logger.error('Error adding new task: ', error);

      throw new Error('Failed to create new task');
    }
  }

  public async updateTaskStatus(taskId: number, status: string): Promise<any> {
    try {
      const taskRepo = await this.getTaskRepository();

      const result = await taskRepo.save({
        id: taskId,
        status,
      });

      // If the task is completed, then complete associated subtasks as well.
      if (status === 'completed') {
        // get all subTasks for task with id

        const response = await taskRepo.query(`
          SELECT id
          FROM task
          WHERE parent_task_id = '${taskId}'
        `);

        const subTaskIds = response.map((elm: any) => elm.id);

        await taskRepo.query(
          `
          UPDATE task
          SET status = 'completed'
          WHERE id IN (${subTaskIds.toString()})
          `
        );

        logger.info(`Updated subtask status to completed for parentTaskId: ${taskId}`);
      }

      if (!result) {
        logger.error('Failed to update status');

        throw new Error('Failed to update status');
      }

      logger.info(`Updated status for taskId: ${taskId}`);

      return {
        data: camelize(result),
        message: 'Updated task status successfully.',
      };
    } catch (error) {
      logger.error('Error updating task status with err: ', error);

      throw new Error('Failed to update task status');
    }
  }

  public async createSubTask(taskId: number, title: string): Promise<any> {
    try {
      const taskRepo = await this.getTaskRepository();

      const parentTask = await taskRepo.findOne(taskId);

      if (!parentTask) {
        logger.error('Invalid parent task id');

        throw createError(400, 'Invalid parent task id');
      }

      const result = await taskRepo.insert({
        title,
        parent_task_id: taskId,
        is_subtask: true,
        status: 'pending',
      });

      if (!result) {
        logger.error('Failed to insert subTask');

        throw new Error('Failed to insert subTask');
      }

      logger.info(`Successfully created subTask for taskId: ${taskId}`);

      return {
        data: camelize(result?.raw),
        message: 'Created subTask successfully.',
      };
    } catch (error) {
      logger.error('Error creating subtask with err: ', error);

      throw error;
    }
  }
}
