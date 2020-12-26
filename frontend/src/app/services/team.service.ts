import { Injectable } from '@angular/core'
import { BehaviorSubject, Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { HttpClient } from '@angular/common/http'

import { lexicaURL } from 'src/app/lexica.properties'
import { Team } from 'src/app/classes/team'
import { User } from 'src/app/classes/user'
import { UserService } from './user.service'

export interface TeamForm {
  readonly name: string
  readonly description?: string
  readonly image?: string
}

@Injectable({
  providedIn: 'root'
})
export class TeamService {
  private readonly teamSource = new BehaviorSubject<Team[]>([])
  private loggedUser = this.userService.emptyUser

  public constructor(
      private readonly userService: UserService,
      private readonly http: HttpClient) {
    this.userService.user.subscribe(user => this.loggedUser = user)
  }

  public getTeams(): Observable<Team[]> {
    this.refreshTeamSource()
    return this.teamSource.asObservable()
  }

  private refreshTeamSource(): void {
    if (this.loggedUser.id) {
      this.http.get<Team[]>(`${lexicaURL}/user/${this.loggedUser.id}/team`)
        .subscribe(teams => this.teamSource.next(teams))
    }
  }

  public getTeam(id: string | null): Observable<Team> {
    return this.http.get<Team>(`${lexicaURL}/team/${id}`)
      .pipe(map(Team.deserialize))
  }

  public createTeam(form: TeamForm): void {
    this.http.post(`${lexicaURL}/team`, { ...form, leader: this.loggedUser.asUUID() })
      .subscribe(() => this.refreshTeamSource())
  }

  public joinTeam(id: string): void {
    this.http.post(`${lexicaURL}/team/${id}/user`, this.loggedUser.asUUID())
      .subscribe(() => this.refreshTeamSource())
  }

  public remove(team: Team): void {
    this.http.delete(`${lexicaURL}/team/${team.id}/user/${this.loggedUser.id}`)
      .subscribe(() => this.refreshTeamSource())
  }
}
