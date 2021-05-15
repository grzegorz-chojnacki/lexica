import { Component, Input, OnInit } from '@angular/core'
import { MatDialog } from '@angular/material/dialog'
import { MatSnackBar } from '@angular/material/snack-bar'
import { Example } from 'src/app/classes/example'
import { Progress } from 'src/app/classes/progress'
import { Task } from 'src/app/classes/task'
import { Team } from 'src/app/classes/team'
import { User } from 'src/app/classes/user'
import { snackBarDuration } from 'src/app/lexica.properties'
import { FullNamePipe } from 'src/app/pipes/full-name.pipe'
import { TeamService } from 'src/app/services/team.service'
import { UserService } from 'src/app/services/user.service'
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component'

const fullname = new FullNamePipe()

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.scss']
})
export class MemberListComponent implements OnInit {
  public user!: User
  public bestMember!: User
  @Input() public team!: Team
  @Input() public leaderView = false
  // When set, progress is calculated only for this task, or else for every task
  @Input() public task?: Task<Example>

  public constructor(
    private readonly dialog: MatDialog,
    private readonly snackbarService: MatSnackBar,
    private readonly teamService: TeamService,
    private readonly userService: UserService) { }

  public ngOnInit(): void {
    this.userService.user.subscribe(u => this.user = u)
    this.team.members.sort((u1, u2) => this.getCompletion(u2) - this.getCompletion(u1))
    this.bestMember = this.team.members[0]
  }

  public getCompletion(user: User): number {
    if (this.task) {
      return user.getTaskProgress(this.task).completion || 0
    } else if (this.team.tasks.length > 0) {
      const progress = this.team.tasks.map(task => user.getTaskProgress(task))
      return Math.round(progress.reduce(Progress.sum, 0) / progress.length)
    } else { return 0 }
  }

  public removeMember(member: User): void {
    this.dialog.open(ConfirmationDialogComponent, {
      data: {
        message: `Czy na pewno usunąć użytkownika ${fullname.transform(member)}?`,
        buttonText: { ok: 'Usuń', cancel: 'Nie' }
      }
    })
      .afterClosed()
      .subscribe(confirmed => {
        if (confirmed) {
          this.teamService.leaveTeam(this.team, member)
          this.snackbarService
            .open('Usunięto członka!', undefined, { duration: snackBarDuration })
        }
      })
  }
}
