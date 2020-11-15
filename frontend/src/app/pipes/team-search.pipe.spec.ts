import { Team } from '../classes/team'
import { User } from '../classes/user'
import { TeamSearchPipe } from './team-search.pipe'

const testUser = new User('', '', '')
const makeTeams = (...names: string[]) => names
  .map(name => new Team(name, '', testUser))

describe('TeamsSearchPipe', () => {
  it('should create an instance', () => {
    const pipe = new TeamSearchPipe()
    expect(pipe).toBeTruthy()
  })

  it('should not filter teams if name is not specified', () => {
    const pipe = new TeamSearchPipe()
    const teams = makeTeams('Foo', 'Bar')

    const result = pipe.transform(teams)
    expect(result).toBe(teams)
  })

  it('should not filter teams if name is empty', () => {
    const pipe = new TeamSearchPipe()
    const teams = makeTeams('Foo', 'Bar')

    const result = pipe.transform(teams, '')
    expect(result).toBe(teams)
  })

  it('should filter teams that has a given letter in name', () => {
    const pipe = new TeamSearchPipe()
    const teams = makeTeams('Foo', 'Bar', 'Baz')
    const expected = [teams[1], teams[2]]

    const result = pipe.transform(teams, 'B')
    expect(result).toEqual(expected)
  })

  it('should not care about letter case', () => {
    const pipe = new TeamSearchPipe()
    const teams = makeTeams('Foo', 'bar', 'Baz')
    const expected = [teams[1], teams[2]]

    let result = pipe.transform(teams, 'B')
    expect(result).toEqual(expected)

    result = pipe.transform(teams, 'b')
    expect(result).toEqual(expected)
  })

  it('should filter teams with a substring in their name', () => {
    const pipe = new TeamSearchPipe()
    const teams = makeTeams('FooB', 'FooBar', 'FooBaz')
    const expected = [teams[1], teams[2]]

    const result = pipe.transform(teams, 'ooba')
    expect(result).toEqual(expected)
  })

  it('should return empty list if no match is found', () => {
    const pipe = new TeamSearchPipe()
    const teams = makeTeams('Foo', 'Bar', 'Baz')
    const expected: Team[] = []

    const result = pipe.transform(teams, 'XXX')
    expect(result).toEqual(expected)
  })
})
