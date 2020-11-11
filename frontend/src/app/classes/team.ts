import { User } from 'src/app/classes/user'
import { TaskType, Task } from 'src/app/classes/task'

export class Team {
  public constructor(
    public readonly name: string,
    public readonly hash: string,
    public readonly leader: User,
    public readonly members: User[],
    public readonly tasks: Task<TaskType>[],
    public readonly description: string = '',
    public readonly image?: ImageBitmap) { }
}
