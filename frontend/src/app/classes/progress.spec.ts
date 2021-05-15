import { tasks } from '../test-data'
import { Progress } from './progress'

describe('Progress', () => {
  it('should sum progress', () => {
    const progress = [
      new Progress(tasks[0], 1),
      new Progress(tasks[0], 2),
      new Progress(tasks[0], 3),
    ]
    expect(progress.reduce(Progress.sum, 0)).toBe(6)
  })

  it('should treat undefined progress as 0', () => {
    const progress = [
      new Progress(tasks[0], 1),
      new Progress(tasks[0], 2),
      new Progress(tasks[0], undefined),
    ]
    expect(progress.reduce(Progress.sum, 0)).toBe(3)
  })
})
