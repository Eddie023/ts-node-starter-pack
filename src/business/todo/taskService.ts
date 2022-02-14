import Task from './taskModel';

interface createTaskRequestParam {
  title: string;
  description: string;
}

interface ApiResponse<T> {
  message?: string;
  data?: any | T;
}

export const getAllTask = async (): Promise<ApiResponse<Task[]>> => {
  const res = await Task.getAllTask();

  return {
    data: res,
    message: 'List of all Tasks',
  };
};

export const createNewTask = async (payload: createTaskRequestParam): Promise<ApiResponse<Task>> => {
  const newTask = await Task.create(payload);

  return {
    data: newTask,
    message: 'New task created',
  };
};
