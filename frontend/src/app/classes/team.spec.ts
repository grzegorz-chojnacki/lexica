import { tasks, team as testTeam, users } from "../test-data"
import { Progress } from "./progress"
import { Task } from "./task"
import { NullTask } from "./task-type"
import { Team } from "./team"
import { User } from "./user"

describe('Team', () => {
  it('should deserialize JSON data', () => {
    const team = Team.deserialize(JSON.parse(JSON.stringify(testTeam)))
    expect(team).toBeInstanceOf(Team)
  })

  it('should know if has members', () => {
    const [a, b, ...rest] = users
    expect(new Team('', '', a, [a]).hasMembers()).toBeTrue()
    expect(new Team('', '', a, [b]).hasMembers()).toBeTrue()
    expect(new Team('', '', a, []).hasMembers()).toBeFalse()
  })

  it('should know if user is a member', () => {
    const [a, b, ...rest] = users
    expect(new Team('', '', a, [a]).hasMember(a)).toBeTrue()
    expect(new Team('', '', a, [b]).hasMember(b)).toBeTrue()
    expect(new Team('', '', a, [b]).hasMember(a)).toBeFalse()
    expect(new Team('', '', a, [ ]).hasMember(a)).toBeFalse()
  })

  it('should know if has tasks', () => {
    const [a, b, ...rest] = users
    expect(new Team('', '', a, [], tasks).hasTasks()).toBeTrue()
    expect(new Team('', '', a, [], []).hasTasks()).toBeFalse()
  })

  it('should return user progress with undefined completions', () => {
    const taskA = new Task('', '', [], NullTask)
    const taskB = new Task('', '', [], NullTask)
    const taskC = new Task('', '', [], NullTask)
    const progressA = [new Progress(taskA, 1), new Progress(taskB, 2)]
    const progressB = [new Progress(taskA, 3), new Progress(taskB, 4)]
    const userA = new User('', '', '', '', '', progressA)
    const userB = new User('', '', '', '', '', progressB)
    const team = new Team('', '', users[0], [userA, userB], [taskA, taskC])

    const output = team.getUserProgress(userA)
    expect(output.length).toEqual(team.tasks.length)
    expect(output.find(p => p.task === taskA)?.completion).toBe(1)
    expect(output.find(p => p.task === taskB)).toBeUndefined()
    expect(output.find(p => p.task === taskC)?.completion).toBeUndefined()
  })
})
