import { Task, TaskType } from './task'

export class Progress {
  public constructor(
    public readonly task: Task<TaskType>,
    public readonly value: number,
  ) { }
}
