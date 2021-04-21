import { ChoiceTestTask, MultiTestTask, NullTask, SimpleCardTask, TaskType } from "./task-type"

const taskTypes = [SimpleCardTask, ChoiceTestTask, MultiTestTask]

describe('TaskType', () => {
  it('should deserialize known types', () => {
    taskTypes.forEach(taskType => {
      const rawTaskType = { id: taskType.id } as TaskType
      expect(TaskType.deserialize(rawTaskType)).toBe(taskType)
    })
  })

  it('should not deserialize NullTask', () => {
    expect(() => TaskType.deserialize(NullTask)).toThrow()
  })

  it('should throw on unknown type', () => {
    const rawTaskType = { id: 9999 } as TaskType
    expect(() => TaskType.deserialize(rawTaskType)).toThrow()
  })
})
