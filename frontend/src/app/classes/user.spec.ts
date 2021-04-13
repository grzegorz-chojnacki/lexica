import { users } from "../test-data"
import { Example } from "./example"
import { Task } from "./task"
import { SimpleCardTask } from "./task-type"
import { User } from "./user"

describe('User', () => {
  it('should deserialize JSON data', () => {
    const output = User.deserialize(JSON.parse(JSON.stringify(users[0])))
    expect(output).toBeInstanceOf(User)
  })

  it('should return task progress', () => {
    const user = users[0]
    const input = user.progress[0]

    const output = user.getTaskProgress(input.task)
    expect(output).toBe(input)
  })

  it('should return undefined completion when no progress for task', () => {
    const user = users[0]
    const input = new Task<Example>('', '', [], SimpleCardTask)

    const output = user.getTaskProgress(input)
    expect(output.completion).toBeUndefined()
    expect(output.task).toBe(input)
  })
})