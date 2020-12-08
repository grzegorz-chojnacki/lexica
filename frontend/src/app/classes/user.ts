import { Progress } from './progress'
import { Task, Example } from './task'

export class User {

  public static deserialize(user: User): User {
    return new User(
      user.firstname,
      user.surname,
      user.email,
      user.progress)
  }

  public constructor(
    public firstname: string,
    public surname: string,
    public email: string,
    public readonly progress: Progress[] = [],
    public readonly avatar?: ImageBitmap) { }

  public getTaskProgress(task: Task<Example>): Progress {
    return this.progress.find(progress => progress.taskId === task.id)
      || new Progress(task.id, 0)
  }
}
