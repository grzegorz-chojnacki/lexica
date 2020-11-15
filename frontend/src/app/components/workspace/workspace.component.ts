import { Component, OnInit } from '@angular/core'
import { MatDialog } from '@angular/material/dialog'

import { Team } from 'src/app/classes/team'
import { User } from 'src/app/classes/user'
import { TeamService } from 'src/app/services/team.service'
import { UserService } from 'src/app/services/user.service'
import { NewTeamComponent } from 'src/app/components/team/new-team-dialog/new-team.component'

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
    private readonly dialog: MatDialog,
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

  public createTeam(): void {
    this.dialog.open(NewTeamComponent).afterClosed().subscribe(console.log)
  }

}
