import { Component, OnInit } from '@angular/core'
import { MatDialog } from '@angular/material/dialog'
import { map } from 'rxjs/operators'
import { zip } from 'rxjs'

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
  public user!: User
  public ownedTeams!: Team[]
  public otherTeams!: Team[]

  public constructor(
    private readonly dialog: MatDialog,
    private readonly teamService: TeamService,
    private readonly userService: UserService) { }

  public ngOnInit(): void {

    this.userService.user.subscribe(user => this.user = user)

    this.teamService.getTeams().subscribe(teams => {
      this.ownedTeams = teams.filter(team => team.leader.id === this.user.id)
      this.otherTeams = teams.filter(team => team.leader.id !== this.user.id)
    })
  }

  public openDialog(): void {
    this.dialog.open(NewTeamComponent, { width: '500px' })
  }

}
