import { Component, Input, OnInit } from '@angular/core'
import { Task, TaskType } from 'src/app/classes/task'
import { MatDialog } from '@angular/material/dialog'
import { TaskDialogComponent } from 'src/app/components/task/task-dialog/task-dialog.component'
import { User } from 'src/app/classes/user'

@Component({
  selector: 'app-task-list-item',
  templateUrl: './task-list-item.component.html',
  styleUrls: ['./task-list-item.component.scss']
})
export class TaskListItemComponent implements OnInit {
  @Input() public task!: Task<TaskType>
  @Input() public users!: User[]

  public constructor(private readonly dialog: MatDialog) { }

  public ngOnInit(): void { }

  public getCompletion(): number {
    const sum = this.users
      .reduce((acc, user) => user.getTaskProgress(this.task).value + acc, 0)
    return sum / this.users.length
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
