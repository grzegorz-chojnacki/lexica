export class Progress {
  public static sum(acc: number, progress: Progress): number {
    return acc + progress.value
  }

  public constructor(
    public readonly taskId: string,
    public readonly value: number,
  ) { }
}
