import { Example } from './example'
import { NullTask, TaskType } from './task-type'
import { Team } from './team'

export type TaskAndUsersWithProgress = {
  task: Task<Example>
  team: Team
}

export class Task<T extends Example> {
  public static readonly empty = new Task('', '', [], NullTask)
  public static deserialize(task: Task<Example>): Task<Example> {
    return new Task(
      task.id,
      task.name,
      task.examples,
      TaskType.deserialize(task.type),
      task.description)
  }

  public constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly examples: T[],
    public readonly type: TaskType,
    public readonly description?: string,
  ) { }
}
