import { Progress } from './progress'
import { Task, TaskType } from './task'

export class User {
  public constructor(
    public firstname: string,
    public surname: string,
    public email: string,
    public readonly progress: Progress[] = [],
    public readonly avatar?: ImageBitmap) { }

  public getTaskProgress(task: Task<TaskType>): Progress {
    return this.progress.find(progress => progress.taskId === task.hash)
      || new Progress(task.hash, 0)
  }
}
