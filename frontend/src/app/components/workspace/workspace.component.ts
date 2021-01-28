import { Component, OnInit } from '@angular/core'
import { MatDialog } from '@angular/material/dialog'

import { Team } from 'src/app/classes/team'
import { TeamService } from 'src/app/services/team.service'
import { UserService } from 'src/app/services/user.service'
import { NewTeamComponent } from 'src/app/components/team/new-team-dialog/new-team.component'
import { BreadCrumbService } from 'src/app/services/bread-crumb.service'
import { combineLatest } from 'rxjs'

@Component({
  selector: 'app-workspace',
  templateUrl: './workspace.component.html',
  styleUrls: ['./workspace.component.scss']
})
export class WorkspaceComponent implements OnInit {
  public search = ''
  public ownedTeams!: Team[]
  public otherTeams!: Team[]

  public constructor(
    private readonly dialog: MatDialog,
    private readonly breadCrumbService: BreadCrumbService,
    private readonly teamService: TeamService,
    private readonly userService: UserService) { }

  public ngOnInit(): void {
    combineLatest([this.userService.user, this.teamService.getTeams()])
      .subscribe(([user, teams]) => {
        this.breadCrumbService.setWorkspace()
        this.ownedTeams = teams.filter(team => team.leader.id === user.id)
        this.otherTeams = teams.filter(team => team.leader.id !== user.id)
      })
  }

  public openDialog(): void {
    this.dialog.open(NewTeamComponent, { width: '500px' })
  }

}
