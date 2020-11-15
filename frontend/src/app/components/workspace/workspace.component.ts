import { Component, OnInit } from '@angular/core'

import { Team } from 'src/app/classes/team'
import { User } from 'src/app/classes/user'
import { TeamService } from 'src/app/services/team.service'
import { UserService } from 'src/app/services/user.service'

@Component({
  selector: 'app-workspace',
  templateUrl: './workspace.component.html',
  styleUrls: ['./workspace.component.scss']
})
export class WorkspaceComponent implements OnInit {
  public search = ''
  public loggedUser!: User
  public ownedTeams!: Team[]
  public otherTeams!: Team[]

  public constructor(
    private readonly teamService: TeamService,
    private readonly userService: UserService) { }

  public ngOnInit(): void {
    this.userService.loggedUser.subscribe(user => this.loggedUser = user)

    this.teamService.teams.subscribe(teams => {
      this.ownedTeams = teams
        .filter((team: Team) => team.leader === this.loggedUser)

      this.otherTeams = teams
        .filter((team: Team) => team.leader !== this.loggedUser)
    })
  }

  public createTeam(): void { }

}
