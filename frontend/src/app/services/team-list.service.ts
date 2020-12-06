import { Injectable } from '@angular/core'
import { BehaviorSubject, Observable } from 'rxjs'

import { Team } from 'src/app/classes/team'
import { User } from 'src/app/classes/user'
import { testTeams } from 'src/app/testData'
import { UserService } from './user.service'

export interface TeamForm {
  readonly name: string
  readonly description?: string
  readonly image?: string
}

@Injectable({
  providedIn: 'root'
})
export class TeamListService {
  private readonly teamSource = new BehaviorSubject<Team[]>(testTeams)
  private loggedUser!: User

  public constructor(private readonly userService: UserService) {
    this.userService.loggedUser.subscribe(user => this.loggedUser = user)
  }

  public get teams(): Observable<Team[]> {
    return this.teamSource.asObservable()
  }

  // ToDo: try to find team with this hash in cached teams (teamSource)
  //       or query server with it
  public getTeam(hash: string | null): Promise<Team> {
    return new Promise((resolve, reject) => {
      const foundTeam = this.teamSource.getValue()
        .find(team => team.hash === hash)

      return (foundTeam) ? resolve(foundTeam) : reject('Team not found')
    })
  }

  // ToDo: Send this data to server and fetch new team list
  public createTeam(form: TeamForm): void {
    const newTeam = new Team(
      form.name,
      btoa(Math.random().toString()), // Base64 encode
      this.loggedUser, [], [],
      form.description)

    this.prependTeamSource(newTeam)
  }


  public joinTeam(hash: string): void {
    const newTeam = new Team(`Zespół ${hash}`, hash, new User('John', 'Doe', 'jdoe@lexica.com'))
    this.prependTeamSource(newTeam)
  }

  private prependTeamSource(team: Team): void {
    this.teamSource.next([team, ...this.teamSource.getValue()])
  }

  // ToDo: Send this data to server and fetch new team list
  public remove(removedTeam: Team): void {
    const withoutRemovedTeam = this.teamSource.value
      .filter(team => team !== removedTeam)

    this.teamSource.next(withoutRemovedTeam)
  }
}
