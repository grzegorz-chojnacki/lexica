import { Injectable } from '@angular/core'
import { BehaviorSubject, Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { HttpClient } from '@angular/common/http'

import { lexicaURL } from 'src/app/lexica.properties'
import { Team } from 'src/app/classes/team'
import { UserService } from './user.service'
import { Task } from '../classes/task'
import { Example } from '../classes/example'
import { TeamHistoryService } from './team-history.service'
import { User } from '../classes/user'

export interface TeamForm {
  readonly name: string
  readonly description: string
  readonly image?: string
}

@Injectable({
  providedIn: 'root'
})
export class TeamService {
  public  readonly emptyTeam = new Team('', '', User.empty)
  private loggedUser = User.empty
  private readonly teamListSource = new BehaviorSubject<Team[]>([])
  private teamSource = new BehaviorSubject<Team>(this.emptyTeam)

  public constructor(
      private readonly teamHistory: TeamHistoryService,
      private readonly userService: UserService,
      private readonly http: HttpClient) {
    this.userService.user.subscribe(user => this.loggedUser = user)
  }

  public getTeams(): Observable<Team[]> {
    this.refreshTeamListSource()
    return this.teamListSource.asObservable()
  }

  private refreshTeamListSource(): void {
    if (this.loggedUser.id) {
      this.http.get<Team[]>(`${lexicaURL}/user/team`, this.userService.authHeader())
        .pipe(map(teams => teams.map(Team.deserialize)))
        .subscribe(teams => {
          this.teamListSource.next(teams)
          this.teamHistory.refreshAll(teams)
        })
    }
  }

  private refreshTeamSource(id: string): void {
    if (this.teamSource.value.id !== id) {
      this.teamSource.next(this.emptyTeam)
    }

    this.http.get<Team>(`${lexicaURL}/team/${id}`, this.userService.authHeader())
      .pipe(map(Team.deserialize))
      .subscribe(
        team => {
          this.teamSource.next(team)
          this.teamHistory.push(team)
        },
        err => {
          this.teamSource.error(err) // Reset teamSource after error
          this.teamSource = new BehaviorSubject<Team>(this.emptyTeam)
        })
  }

  public getTeam(id: string | null): Observable<Team> {
    if (id) { this.refreshTeamSource(id) }
    return this.teamSource.asObservable()
  }

  public createTeam(form: TeamForm): void {
    this.http.post(`${lexicaURL}/team`, form, this.userService.authHeader())
      .subscribe(() => this.refreshTeamListSource())
  }

  public updateTeam(id: string, form: TeamForm): void {
    this.http.put(`${lexicaURL}/team/${id}`, form, this.userService.authHeader())
      .subscribe(() => {
        this.refreshTeamListSource()
        this.refreshTeamSource(id)
      })
  }

  public joinTeam(id: string): void {
    this.http.post(
        `${lexicaURL}/team/${id}/user`,
        this.loggedUser.asUUID(),
        this.userService.authHeader())
      .subscribe(() => {
        this.refreshTeamListSource()
        this.refreshTeamSource(id)
      })
  }

  public leaveTeam(team: Team, user = this.loggedUser): void {
    this.http.delete(
        `${lexicaURL}/team/${team.id}/user/${user.id}`,
        this.userService.authHeader())
      .subscribe(() => {
        this.refreshTeamListSource()
        this.refreshTeamSource(team.id)
      })
  }

  public remove(team: Team): void {
    this.http.delete(
        `${lexicaURL}/team/${team.id}`,
        this.userService.authHeader())
      .subscribe(() => {
        this.refreshTeamListSource()
        this.refreshTeamSource(team.id)
      })
  }

  public removeTask(task: Task<Example>, team: Team): void {
    this.http.delete(
        `${lexicaURL}/team/${team.id}/task/${task.id}`,
        this.userService.authHeader())
      .subscribe(() => this.refreshTeamSource(team.id))
  }
}
