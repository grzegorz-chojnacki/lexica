export class TaskType {
  public static deserialize(taskType: TaskType) {
    switch (taskType.id) {
      case SimpleCardTask.id: return SimpleCardTask
      case ChoiceTestTask.id: return ChoiceTestTask
      case MultiTestTask.id: return MultiTestTask
      default: throw new Error(`Not known task type id: ${taskType.id}`)
    }
  }

  public constructor(
    public readonly id: number,
    public readonly name: string,
    public readonly description?: string,
  ) { }
}

export const NullTask       = new TaskType(0, '')
export const SimpleCardTask = new TaskType(1, 'Fiszka')
export const ChoiceTestTask = new TaskType(2, 'Test jednokrotnego wyboru')
export const MultiTestTask = new TaskType(3, 'Test wielokrotnego wyboru')
