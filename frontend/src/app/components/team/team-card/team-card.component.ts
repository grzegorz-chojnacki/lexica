import { Component, Input, OnInit } from '@angular/core'
import { MatDialog } from '@angular/material/dialog'
import { MatSnackBar } from '@angular/material/snack-bar'

import { Team } from 'src/app/classes/team'
import { TeamService } from 'src/app/services/team.service'
import { TaskAddingComponent } from '../../task/task-adding/task-adding.component'
import { TeamSettingsComponent } from '../team-settings/team-settings.component'
import { ConfirmationDialogComponent } from 'src/app/components/confirmation-dialog/confirmation-dialog.component'


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

  public newTaskDialog(): void {
    this.dialog.open(TaskAddingComponent, { width: '500px' })
  }

  openDialog() {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent,{
      data:{
        message: 'Czy na pewno usunąć?',
        buttonText: {
          ok: 'Usuń',
          cancel: 'Nie'
        }
      }
    });

    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.removeTeam()
      }
    });
  }

  openDialogToLeaveTeam() {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent,{
      data:{
        message: 'Czy na pewno opuścić zespół?',
        buttonText: {
          ok: 'Opuść',
          cancel: 'Nie'
        }
      }
    });

    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.leaveTeam()
      }
    });
  }
}
