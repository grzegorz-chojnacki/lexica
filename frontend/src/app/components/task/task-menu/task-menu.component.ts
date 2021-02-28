import { Component, Input, OnInit, ViewChild } from '@angular/core'
import { MatDialog } from '@angular/material/dialog'
import { MatMenu } from '@angular/material/menu'
import { Task, Example } from 'src/app/classes/task'
import { Team } from 'src/app/classes/team'
import { TaskDetailsComponent } from 'src/app/components/task/task-details/task-details.component'
import { TeamService } from 'src/app/services/team.service'
import { ConfirmationDialogComponent } from 'src/app/components/confirmation-dialog/confirmation-dialog.component'

@Component({
  selector: 'app-task-menu',
  templateUrl: './task-menu.component.html',
  styleUrls: ['./task-menu.component.scss']
})
export class TaskMenuComponent implements OnInit {
  @Input() public task!: Task<Example>
  @Input() public team!: Team
  @Input() public leaderView = false
  @ViewChild(MatMenu, { static: true }) public readonly menu!: MatMenu

  public constructor(
    private readonly dialog: MatDialog,
    private readonly teamService: TeamService
  ) { }

  public ngOnInit(): void { }

  public taskDescription(): void {
    this.dialog.open(TaskDetailsComponent, {
      width: '700px',
      data: { task: this.task, team: this.team }
    })
  }

  public removeItself(): void {
    this.teamService.removeTask(this.task, this.team)
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
        this.removeItself()

      }
    });
  }
}


