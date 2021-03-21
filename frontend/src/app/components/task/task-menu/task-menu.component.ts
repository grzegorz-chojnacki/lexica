import { Component, Input, OnInit, ViewChild } from '@angular/core'
import { MatDialog } from '@angular/material/dialog'
import { MatMenu } from '@angular/material/menu'
import { Task } from 'src/app/classes/task'
import { Team } from 'src/app/classes/team'
import { TaskDetailsComponent } from 'src/app/components/task/task-details/task-details.component'
import { TeamService } from 'src/app/services/team.service'
import { ConfirmationDialogComponent } from 'src/app/components/confirmation-dialog/confirmation-dialog.component'
import { Example } from 'src/app/classes/example'
import { snackBarDuration } from 'src/app/lexica.properties'
import { MatSnackBar } from '@angular/material/snack-bar'
import { TaskService } from 'src/app/services/task.service'
import { saveAs } from 'file-saver'

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
    private readonly snackbarService: MatSnackBar,
    private readonly teamService: TeamService,
    private readonly taskService: TaskService
  ) { }

  public ngOnInit(): void { }

  public taskDescription(): void {
    this.dialog.open(TaskDetailsComponent, {
      width: '700px',
      data: { task: this.task, team: this.team }
    })
  }

  public export(): void {
    this.taskService.getTask(this.team.id, this.task.id)
      .subscribe(task => {
        if (task !== this.taskService.emptyTask) {
          const blob = new Blob(
            [ JSON.stringify(task.examples, null, '  ') ],
            { type: 'text/plain;charset=utf-8' })
          saveAs(blob, `${task.name}.json`)
        }
      })

  }

  public removeItself(): void {
    this.teamService.removeTask(this.task, this.team)
    this.snackbarService
      .open('Usunięto zadanie!', undefined, { duration: snackBarDuration })
  }

  public openDialog(): void {
    this.dialog.open(ConfirmationDialogComponent, {
      data: {
        message: 'Czy na pewno usunąć zadanie?',
        buttonText: { ok: 'Usuń', cancel: 'Nie' }
      }
    })
      .afterClosed()
      .subscribe((confirmed: boolean) => confirmed ? this.removeItself() : null)
  }
}
