import { simpleCardTask } from "../test-data"
import { SimpleCard } from "./example"
import { Task } from "./task"
import { TaskType } from "./task-type"

describe('Task', () => {
  it('should deserialize tasks with taskTypes', () => {
    const rawTask = JSON.parse(JSON.stringify(simpleCardTask)) as Task<SimpleCard>
    spyOn(TaskType, 'deserialize').and.callThrough()

    const task = Task.deserialize(rawTask)
    expect(TaskType.deserialize).toHaveBeenCalledWith(rawTask.type)

    expect(task.type).toBe(simpleCardTask.type)
  })
})
