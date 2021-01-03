import { Component, Input, OnInit } from '@angular/core'
import { MatDialog } from '@angular/material/dialog'
import { MatSnackBar } from '@angular/material/snack-bar'

import { Team } from 'src/app/classes/team'
import { TeamService } from 'src/app/services/team.service'
import { TeamSettingsComponent } from '../team-settings/team-settings.component'

@Component({
  selector: 'app-team-card',
  templateUrl: './team-card.component.html',
  styleUrls: ['./team-card.component.scss'],
})
export class TeamCardComponent implements OnInit {
  @Input() public team!: Team
  @Input() public leaderView = false
  @Input() public context!: 'TeamContainer' | 'Team'

  public constructor(
    private readonly dialog: MatDialog,
    private readonly snackbarService: MatSnackBar,
    private readonly teamService: TeamService) { }

  public ngOnInit(): void { }

  public removeTeam(): void { this.teamService.remove(this.team) }
  public leaveTeam(): void  { this.teamService.leaveTeam(this.team) }

  public teamSettings(): void {
    this.dialog.closeAll()
    this.dialog.open(TeamSettingsComponent, { data: this.team })
  }

  public copyToClipboard(): void {
    navigator.clipboard.writeText(this.team.id)
    this.snackbarService
      .open('Skopiowano do schowka!', undefined, { duration: 2000 })
  }
}
