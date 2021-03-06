import { SimpleCardViewComponent } from "../components/task/task-view/simple-card-view/simple-card-view.component"

export class TaskType {
  public static deserialize(taskType: TaskType) {
    switch (taskType.id) {
      case SimpleCardTask.id: return SimpleCardTask
      case ChoiceTestTask.id: return ChoiceTestTask
      default: throw new Error(`Not known task type id: ${taskType.id}`)
    }
  }

  public constructor(
    public readonly id: number,
    public readonly name: string,
    public readonly view: any,
    public readonly description?: string,
    public readonly image?: ImageBitmap
  ) { }
}

export const EmptyTask      = new TaskType(0, '', null)
export const SimpleCardTask = new TaskType(1, 'Fiszka', SimpleCardViewComponent)
export const ChoiceTestTask = new TaskType(2, 'Test', null)
