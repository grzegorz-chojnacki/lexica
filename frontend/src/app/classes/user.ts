import { Progress } from './progress'
import { Task, Example } from './task'

export class User {

  public static deserialize(user: User): User {
    return new User(
      user.id,
      user.firstname,
      user.surname,
      user.email,
      user.password,
      user.progress)
  }

  public constructor(
    public readonly id: string,
    public firstname: string,
    public surname: string,
    public email: string,
    public password: string,
    public readonly progress: Progress[] = [],
    public readonly color?: string) { }

  public getTaskProgress(task: Task<Example>): Progress {
    return this.progress.find(progress => progress.task.id === task.id)
      || new Progress(task, undefined)
  }

  public asUUID = () => ({ id: this.id })
}
