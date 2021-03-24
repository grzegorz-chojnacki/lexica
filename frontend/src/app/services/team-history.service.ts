import { Injectable } from '@angular/core'
import { BehaviorSubject, Observable } from 'rxjs'
import { Team } from '../classes/team'

@Injectable({
  providedIn: 'root'
})
export class TeamHistoryService {
  private readonly storage = localStorage
  private readonly teamSource = new BehaviorSubject<Team[]>(this.loadTeams())

  public constructor() { }

  public loadTeams(): Team[] {
    const key = this.storage.getItem('teams')
    return key ? JSON.parse(key) : []
  }

  public get teams(): Observable<Team[]> {
    return this.teamSource.asObservable()
  }

  public push(team: Team) {
    let teams = [...this.teamSource.value]
    const foundIndex = teams.findIndex(t => t.id === team.id)

    if (foundIndex >= 0) {
      teams.splice(foundIndex, 1)
      teams = teams.slice(0, 9) // Limit history to 9 teams + new one
    }

    this.teamSource.next([this.trimData(team), ...teams])
    this.saveTeams()
  }

  private trimData(team: Team): Team {
    return { id: team.id, name: team.name } as Team
  }

  public refreshAll(teams: Team[]) {
    const refreshedTeams = this.teamSource.value.reduce((acc: Team[], team) => {
      const found = teams.find(t => t.id === team.id)
      return found ? [...acc, this.trimData(found)] : acc
    }, [])

    this.teamSource.next(refreshedTeams)
    this.saveTeams()
  }

  private saveTeams(): void {
    this.storage.setItem('teams', JSON.stringify(this.teamSource.value))
  }
}
