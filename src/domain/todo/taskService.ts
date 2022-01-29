import Task from "./taskModel"

export const getAllTask = async () => {
  const task = new Task;

  return task.getAllTask()
}
