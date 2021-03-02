export class TaskType {
  public constructor(
    public readonly id: number,
    public readonly name?: string,
    public readonly description?: string,
    public readonly image?: ImageBitmap
  ) { }
}

export const SimpleCardTask = new TaskType(1)
export const ChoiceTestTask = new TaskType(2,'Test jednokrotnego wyboru')
