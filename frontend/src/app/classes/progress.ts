import { Example, Task } from './task';

export class Progress {
  public static sum(acc: number, progress: Progress): number {
    return acc + progress.completed
  }

  public constructor(
    public readonly task: Task<Example>,
    public readonly completed: number,
  ) { }
}
