import { BaseModel, logger } from '../../core/utils';

class Task extends BaseModel {
  // This is required. Give the db table name.
  static get tableName() {
    return 'todo';
  }

  /**
   * Get all task and it's associated subTasks.
   *
   * @returns {Promise<Success<TaskDetails | string>>}
   */
  public static async getAllTask(): Promise<Task[]> {
    try {
      logger.info('fetching all tasks with associated subTasks');

      const todos = await Task.findAll();

      return todos;
    } catch (error) {
      logger.error('error fetching all tasks with err: ', error);

      throw error;
    }
  }

  /**
   * Create new task given title and description (optional).
   *
   * @param  {T} payload
   * @returns {Promise<Task>}
   */
  public static async create(payload: { title: string; description?: string }): Promise<Task> {
    try {
      const result = await Task.insert(payload);

      return result;
    } catch (err) {
      logger.error('error creating new task with err: ', err);

      throw err;
    }
  }
}

export default Task;
