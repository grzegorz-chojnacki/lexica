abstract class TaskType {
  public abstract readonly name: string
  public abstract readonly description: string
  public abstract readonly image?: ImageBitmap
}


export class SimpleCard extends TaskType {
  public readonly name = 'Fiszka prosta'
  public readonly description = 'Opis fiszki prostej'
  public readonly image?: ImageBitmap

  public constructor(
    public readonly nativeWord: string,
    public readonly foreignWord: string,
  ) { super() }
}

export class Task<T extends TaskType> {
  public constructor(
    public readonly hash: string,
    public readonly name: string,
    public readonly content: T[],
    public readonly isActive: boolean = true,
    public readonly description?: string,
  ) { }

  public get type(): TaskType { return this.content[0] }
}
