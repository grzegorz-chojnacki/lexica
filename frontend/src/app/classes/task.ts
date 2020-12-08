import { TaskType } from './task-type'
import { User } from './user'

export interface TaskAndUsersWithProgress {
  task: Task<Example>
  users: User[]
}

export abstract class Example { }

export class SimpleCard extends Example {
  public constructor(
    public readonly foreignWord: string,
    public readonly nativeWord: string,
    public readonly image?: ImageBitmap,
  ) { super() }
}

export class Task<T extends Example> {
  public constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly examples: T[],
    public readonly type: TaskType,
    public readonly isActive: boolean = true,
    public readonly description?: string,
  ) { }
}
