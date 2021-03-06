import { Example } from './example'
import { TaskType } from './task-type'
import { Team } from './team'

export type TaskAndUsersWithProgress = {
  task: Task<Example>
  team: Team
}

export class Task<T extends Example> {
  public static deserialize(task: Task<Example>): Task<Example> {
    return new Task(
      task.id,
      task.name,
      task.examples,
      TaskType.deserialize(task.type),
      task.isActive,
      task.description)
  }

  public constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly examples: T[],
    public readonly type: TaskType,
    public readonly isActive: boolean = true,
    public readonly description?: string,
  ) { }
}
