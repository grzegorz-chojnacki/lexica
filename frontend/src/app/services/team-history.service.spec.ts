import { TestBed } from '@angular/core/testing'
import { Team } from '../classes/team'
import { User } from '../classes/user'
import { fakeUserService, team, users } from '../test-data'

import { TeamHistoryService } from './team-history.service'
import { UserService } from './user.service'

const maxLength = TeamHistoryService.maxHistoryLength

describe('TeamHistoryService', () => {
  let service: TeamHistoryService
  let userService: UserService

  beforeEach(() => {
    localStorage.clear()
    TestBed.configureTestingModule({
      imports: [],
      providers: [{ provide: UserService, useValue: fakeUserService() }]
    })
    service = TestBed.inject(TeamHistoryService)
    userService = TestBed.inject(UserService)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })

  it('should initialize with empty history', () => {
    service.teams.subscribe(teams => expect(teams).toEqual([]))
  })

  it('should save team in history', () => {
    service.push(team)
    service.teams.subscribe(teams => expect(teams[0].id).toEqual(team.id))
  })

  it('should save team in localStorage', () => {
    userService.login('user', '')
    service.push(team)
    service.teams.subscribe(() => {
      const key = localStorage.key(0)
      expect(key).toBeTruthy()
      expect(localStorage.getItem(key as string)).toBeTruthy()
    })
  })

  it('should load history from localStorage', () => {
    userService = fakeUserService() as any as UserService
    userService.login('', '')
    localStorage.setItem(`${users[0].id}-teams`, JSON.stringify([
      { id: 'A', name: 'A' },
      { id: 'B', name: 'B' }
    ]))

    service = new TeamHistoryService(userService)
    service.teams.subscribe(teams => {
      expect(teams.length).toBe(2)
      expect(teams[0].id).toEqual('A')
      expect(teams[1].id).toEqual('B')
    })
  })

  it('should bubble team to the top when already in history', () => {
    const teamA = new Team('A', 'A', User.empty)
    const teamB = new Team('B', 'B', User.empty)
    service.push(teamA)
    service.push(teamB)
    service.push(teamA)

    service.teams.subscribe(teams => {
      expect(teams.length).toBe(2)
      expect(teams[0].id).toEqual(teamA.id)
      expect(teams[1].id).toEqual(teamB.id)
    })
  })

  it('should refresh all teams that were saved in history', () => {
    userService.login('', '')
    const teamA = new Team('A', 'A', User.empty)
    const teamB = new Team('B', 'B', User.empty)
    service.push(teamA)
    service.push(teamB)

    const newTeamA = new Team('A-new', 'A', User.empty)
    service.refreshAll([newTeamA])

    service.teams.subscribe(teams => {
      expect(teams.length).toBe(1)
      expect(teams[0].id).toEqual(newTeamA.id)
    })
  })

  it(`should limit history to ${maxLength} entries`, () => {
    userService.login('', '')
    const pushedTeams = new Array(15)
      .fill(0)
      .map((_, i) => new Team(`${i}`, `${i}`, User.empty))

    pushedTeams.forEach(team => service.push(team))

    service.teams.subscribe(teams => {
      expect(teams.length).toBe(maxLength)
      expect(teams[0].id)
        .toEqual(pushedTeams[pushedTeams.length - 1].id)
      expect(teams[teams.length - 1].id)
        .toEqual(pushedTeams[pushedTeams.length - maxLength].id)
    })
  })
})
