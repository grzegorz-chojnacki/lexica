import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'
import { TestBed } from '@angular/core/testing'
import { Team } from '../classes/team'
import { lexicaURL } from '../lexica.properties'
import { fakeUserService, team, users } from '../test-data'

import { TeamService } from './team.service'
import { UserService } from './user.service'

describe('TeamService', () => {
  let service: TeamService
  let userService: UserService
  let httpMock: HttpTestingController

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        { provide: UserService, useValue: fakeUserService() }
      ]
    })
    service = TestBed.inject(TeamService)
    httpMock = TestBed.inject(HttpTestingController)
    userService = TestBed.inject(UserService)
    userService.login('', '')
  })

  afterEach(() => { httpMock.verify() })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })

  it('should initialize and not fetch data', () => {
    userService.logout()
    service.getTeams().subscribe(teams => expect(teams).toEqual([]))
    httpMock.expectNone(`${lexicaURL}/user/team`)
  })

  it('should fetch user team list after login', () => {
    const userTeams = [team]
    userService.login('', '')

    service.getTeams().subscribe(teams => (teams.length > 0)
        && expect(JSON.stringify(teams)).toEqual(JSON.stringify(userTeams)))

    httpMock.expectOne(`${lexicaURL}/user/team`).flush(userTeams)
  })

  it('should handle fetch user team list error', () => {
    const handler = { teams: (t: Team[]) => { }, err: () => { } }
    spyOn(handler, 'teams')
    spyOn(handler, 'err')

    service.getTeams().subscribe(handler.teams, handler.err)

    httpMock.expectOne(`${lexicaURL}/user/team`).error(new ErrorEvent(''))

    expect(handler.teams).toHaveBeenCalled()
    expect(handler.err).toHaveBeenCalled()
  })

  it('should fetch team', () => {
    service
    .getTeam(team.id)
    .subscribe(t => (t !== Team.empty)
      && expect(JSON.stringify(t)).toEqual(JSON.stringify(team)))

    httpMock.expectOne(`${lexicaURL}/team/${team.id}`).flush(team)
  })

  it('should handle fetch team error', () => {
    const handler = { team: (t: Team) => { }, err: () => { } }
    spyOn(handler, 'team')
    spyOn(handler, 'err')

    service
      .getTeam(team.id)
      .subscribe(handler.team, handler.err)

    httpMock.expectOne(`${lexicaURL}/team/${team.id}`).error(new ErrorEvent(''))
    expect(handler.team).toHaveBeenCalledOnceWith(Team.empty)
    expect(handler.err).toHaveBeenCalled()
  })

  it('should make create-team request', () => {
    service.createTeam({ name: '', description: '', color: '' })
    const req = httpMock.expectOne(`${lexicaURL}/team`).request
    expect(req.method).toBe('POST')
  })

  it('should make join-team request', () => {
    service.joinTeam(team.id)
    const req = httpMock.expectOne(`${lexicaURL}/team/${team.id}/user`).request
    expect(req.method).toBe('POST')
  })

  it('should make update-team request', () => {
    service.updateTeam(team.id, { name: '', description: '', color: ''})
    const req = httpMock.expectOne(`${lexicaURL}/team/${team.id}`).request
    expect(req.method).toBe('PUT')
  })

  it('should make remove-team request', () => {
    service.remove(team)
    const req = httpMock.expectOne(`${lexicaURL}/team/${team.id}`).request
    expect(req.method).toBe('DELETE')
  })

  it('should make remove-team-task request', () => {
    const task = team.tasks[0]
    service.removeTask(task, team)
    const req = httpMock
      .expectOne(`${lexicaURL}/team/${team.id}/task/${task.id}`)
      .request
    expect(req.method).toBe('DELETE')
  })

  it('should make leave-team request for logged user', () => {
    userService.user.subscribe(u => {
      service.leaveTeam(team)
      const req = httpMock
        .expectOne(`${lexicaURL}/team/${team.id}/user/${u.id}`)
        .request
      expect(req.method).toBe('DELETE')
    })
  })

  it('should make leave-team request for different user', () => {
    const user = users[0]
    service.leaveTeam(team, user)
    const req = httpMock
      .expectOne(`${lexicaURL}/team/${team.id}/user/${user.id}`)
      .request
    expect(req.method).toBe('DELETE')
  })
})
