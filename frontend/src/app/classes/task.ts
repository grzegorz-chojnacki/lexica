import { TaskType } from './task-type'
import { Team } from './team'

export type TaskAndUsersWithProgress = {
  task: Task<Example>
  team: Team
}

export abstract class Example { }

export class SimpleCard extends Example {
  public constructor(
    public foreignWord: string,
    public nativeWord: string,
    public readonly image?: ImageBitmap,
  ) { super() }
}

export class ChoiceTest extends Example {
  public constructor(
    public question: string,
    public answer: string,
    public decoys: string[],
    public readonly image?: ImageBitmap,
  ) { super() }

public addCorrectAnswerToDecoys(): void {
this.decoys.push(this.answer)
}
}

export class Task<T extends Example> {
  public static deserialize(task: Task<SimpleCard>): Task<SimpleCard> {
    return new Task(
      task.id,
      task.name,
      task.examples,
      task.type,
      task.isActive,
      task.description)
  }


  public constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly examples: T[],
    public readonly type: TaskType,
    public readonly isActive: boolean = true,
    public readonly description?: string,
  ) { }
}
