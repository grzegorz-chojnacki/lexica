import { Component, Input, OnInit } from '@angular/core'
import { Task, Example } from 'src/app/classes/task'
import { MatDialog } from '@angular/material/dialog'
import { TaskDialogComponent } from 'src/app/components/task/task-dialog/task-dialog.component'
import { User } from 'src/app/classes/user'
import { Progress } from 'src/app/classes/progress'

@Component({
  selector: 'app-task-list-item',
  templateUrl: './task-list-item.component.html',
  styleUrls: ['./task-list-item.component.scss']
})
export class TaskListItemComponent implements OnInit {
  @Input() public task!: Task<Example>
  @Input() public users!: User[]

  public constructor(private readonly dialog: MatDialog) { }

  public ngOnInit(): void { }

  public getTeamProgress(): number {
    const sum = this.users
      .map(user => user.getTaskProgress(this.task))
      .reduce(Progress.sum, 0)

    return Math.round(sum / this.users.length)
  }

  public launchTask(): void {
    this.dialog.open(TaskDialogComponent, {
        width: '500px',
        data: {
          task: this.task,
          users: this.users
        }
      })
  }
}
