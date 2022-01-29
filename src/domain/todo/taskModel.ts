
// import TaskEntity from '../entities/Task';
import { BaseModel, logger } from '../../core/utils';

interface TaskDetails {
  id: number;
  title: string;
  status: string;
  createdAt: string;
  subTask: TaskDetails[];
}


class Task extends BaseModel {
  static tableName: string = 'task'

  /**
   * Get all task and it's associated subTasks.
   *
   * @returns {Promise<Success<TaskDetails | string>>}
   */
  public async getAllTask(): Promise<any> {
    try {
      logger.info('Fetching all tasks with associated subTasks');

      return {
        data: [],
        message: 'List of tasks',
      };
    } catch (error) {
      logger.error('Error fetching all tasks with err: ', error);

      throw new Error('Failed to fetch all tasks');
    }
  }
}

export default Task
