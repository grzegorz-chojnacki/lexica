import { Injectable } from '@angular/core'
import { BehaviorSubject, Observable } from 'rxjs'
import { Team } from 'src/app/classes/team'
import { User } from 'src/app/classes/user'

const tempUser = new User('John', 'Doe', 'jdoe@email.com')
const tempUsers = Array<User>(10).fill(tempUser)

const tempTeam = new Team('Zespół', tempUser, tempUsers, 'Krótki opis zespołu')
const tempTeams = Array<Team>(5).fill(tempTeam)

@Injectable({
  providedIn: 'root',
  useFactory: () => new TeamService(localStorage)
})
export class TeamService {
  private readonly teamSource = new BehaviorSubject(tempTeams)

  public get teams(): Observable<Team[]> {
    return this.teamSource.asObservable()
  }

  public constructor(private readonly storage: Storage) { }
}
