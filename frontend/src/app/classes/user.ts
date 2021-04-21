import { Example } from './example'
import { Progress } from './progress'
import { Task } from './task'

export class User {
  public static readonly empty = new User('', '', '', '', '')

  public static deserialize(user: User): User {
    return new User(
      user.id,
      user.firstname,
      user.surname,
      user.username,
      user.password,
      user.progress,
      user.color)
  }

  public constructor(
    public readonly id: string,
    public firstname: string,
    public surname: string,
    public username: string,
    public password: string,
    public readonly progress: Progress[] = [],
    public readonly color = '#000000') { }

  public getTaskProgress(task: Task<Example>): Progress {
    return this.progress.find(progress => progress.task.id === task.id)
      || new Progress(task, undefined)
  }

  public asUUID = () => ({ id: this.id })
}
