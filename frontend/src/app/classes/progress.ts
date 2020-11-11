import { Task, TaskType } from './task'

export class Progress {
  public static sum(acc: number, progress: Progress): number {
    return acc + progress.value
  }

  public constructor(
    public readonly task: Task<TaskType>,
    public readonly value: number,
  ) { }
}
