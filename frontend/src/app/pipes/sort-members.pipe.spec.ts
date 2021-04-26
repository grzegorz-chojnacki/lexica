import { Progress } from '../classes/progress'
import { Team } from '../classes/team'
import { team, users } from '../test-data'
import { SortMembersPipe } from './sort-members.pipe'

describe('SortMembersPipe', () => {
  it('should create an instance', () => {
    const pipe = new SortMembersPipe()
    expect(pipe).toBeTruthy()
  })

  it('should keep every member', () => {
    const pipe = new SortMembersPipe()
    const user = team.members[0]

    const sorted = pipe.transform(team, user)

    team.members.forEach(member => expect(sorted).toContain(member))
  })

  it('should handle team with no members', () => {
    const pipe = new SortMembersPipe()
    const user = users[0]
    const team = new Team('', '', user)

    const sorted = pipe.transform(team, user)
    expect(sorted).toEqual([])
  })

  it('should handle team with leader as only member', () => {
    const pipe = new SortMembersPipe()
    const user = users[0]
    const team = new Team('', '', user, [user])

    const sorted = pipe.transform(team, user)
    expect(sorted).toEqual([user])
  })

  it('should handle teams with no tasks', () => {
    const pipe = new SortMembersPipe()
    const user = users[0]
    const team = new Team('', '', user, users)

    const sorted = pipe.transform(team, user)

    expect(sorted).toEqual(team.members)
  })

  it('should bubble loggedUser to the top', () => {
    const pipe = new SortMembersPipe()
    const user = team.members[0]

    const sorted = pipe.transform(team, user)

    expect(sorted[0]).toBe(user)
  })

  it('should order members by progress', () => {
    const pipe = new SortMembersPipe()
    const user = team.members[0]

    const sorted = pipe.transform(team, user)

    for (let i = 1; i < sorted.length - 1; i++) {
      const progressA = team.getUserProgress(sorted[i]).reduce(Progress.sum, 0)
      const progressB = team.getUserProgress(sorted[i + 1]).reduce(Progress.sum, 0)
      expect(progressA >= progressB).toBeTrue()
    }
  })
})
