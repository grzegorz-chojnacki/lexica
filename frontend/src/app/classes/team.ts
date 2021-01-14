import { User } from 'src/app/classes/user'
import { Example, Task } from 'src/app/classes/task'
import { Progress } from './progress'

export class Team {
  public readonly users = [this.leader, ...this.members]

  public static deserialize(team: Team): Team {
    return new Team(
      team.name,
      team.id,
      User.deserialize(team.leader),
      team.members.map(User.deserialize),
      team.tasks,
      team.description)
  }

  public constructor(
    public readonly name: string,
    public readonly id: string,
    public readonly leader: User,
    public readonly members: User[] = [],
    public readonly tasks: Task<Example>[] = [],
    public readonly description: string = '',
    public readonly color: string = '#ed70c6',
    public readonly image?: ImageBitmap) { }

  public hasMembers(): boolean {
    return this.members.length > 0
  }

  public hasTasks(): boolean {
    return this.tasks.length > 0
  }

  public getUserProgress(user: User): Progress[] {
    return this.tasks.map(task => user.getTaskProgress(task))
  }

  public getTaskProgress(task: Task<Example>): Progress[] {
    return this.users.map(user => user.getTaskProgress(task))
  }

  public isMember(user: User): boolean {
    return this.members.find(member => member.id === user.id) !== undefined
  }
}
