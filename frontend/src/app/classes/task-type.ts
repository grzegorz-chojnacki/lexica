export class TaskType {
  public constructor(
    public readonly name: string,
    public readonly description: string,
    public readonly iamge?: ImageBitmap
  ) { }
}

export const SimpleCardTask = new TaskType('Fiszka', 'Prosta fiszka służąca do powtarzania')
