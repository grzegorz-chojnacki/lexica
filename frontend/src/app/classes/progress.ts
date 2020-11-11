import { Task, TaskType } from './task'
import { Team } from './team'

export class Progress {
  public constructor(
    public readonly team: Team,
    public readonly task: Task<TaskType>,
    public readonly value: number,
  ) { }
}
