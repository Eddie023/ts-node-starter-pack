
import { BaseModel, logger } from '../../core/utils';

interface TaskDetails {
  id: number;
  title: string;
  status: string;
  createdAt: string;
  subTask: TaskDetails[];
}


class Task extends BaseModel {
  // This is required. Give the db table name.
  static get tableName() {
    return 'todo'
  }

  /**
   * Get all task and it's associated subTasks.
   *
   * @returns {Promise<Success<TaskDetails | string>>}
   */
  public static async getAllTask(): Promise<{ data: Task[], message: string }> {
    try {
      logger.info('fetching all tasks with associated subTasks');

      const todos = await Task.findAll()

      return {
        data: todos,
        message: 'List of tasks',
      };
    } catch (error) {
      logger.error('error fetching all tasks with err: ', error);

      throw error
    }
  }
}

export default Task
