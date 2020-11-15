import { User } from 'src/app/classes/user'
import { TaskType, Task } from 'src/app/classes/task'
import { Progress } from './progress'

export class Team {
  public readonly users = [this.leader, ...this.members]

  public constructor(
    public readonly name: string,
    public readonly hash: string,
    public readonly leader: User,
    public readonly members: User[] = [],
    public readonly tasks: Task<TaskType>[] = [],
    public readonly description: string = '',
    public readonly image?: ImageBitmap) { }

  public getUserProgress(user: User): Progress[] {
    return this.tasks.map(task => user.getTaskProgress(task))
  }

  public getTaskProgress(task: Task<TaskType>): Progress[] {
    return this.users.map(user => user.getTaskProgress(task))
  }
}
