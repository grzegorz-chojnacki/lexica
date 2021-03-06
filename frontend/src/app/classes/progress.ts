import { Example } from './example'
import { Task } from './task'

export class Progress {
  public static sum(acc: number, progress: Progress): number {
    return acc + (progress.completion || 0)
  }

  public constructor(
    public readonly task: Task<Example>,
    public readonly completion: number | undefined,
  ) { }
}
