export class Progress {
  public static sum(acc: number, progress: Progress): number {
    return acc + progress.completed
  }

  public constructor(
    public readonly taskId: string,
    public readonly completed: number,
  ) { }
}
