import { Injectable } from '@angular/core'
import { BehaviorSubject, Observable } from 'rxjs'

import { Team } from 'src/app/classes/team'
import { User } from 'src/app/classes/user'

export const testUser = new User('John', 'Doe', 'jdoe@email.com')
export const testUsers = Array<User>(10).fill(testUser)

export const testTeam = new Team('Zespół', testUser, testUsers, 'Krótki opis zespołu')
export const testTeams = Array<Team>(5).fill(testTeam)

@Injectable({
  providedIn: 'root'
})
export class TeamService {
  private readonly teamSource = new BehaviorSubject(testTeams)

  public get teams(): Observable<Team[]> {
    return this.teamSource.asObservable()
  }

  public constructor() { }
}
