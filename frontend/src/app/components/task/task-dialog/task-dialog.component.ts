import { Component, Inject, OnInit } from '@angular/core'
import { MAT_DIALOG_DATA } from '@angular/material/dialog'
import { Task, TaskType, TaskAndUsersWithProgress } from 'src/app/classes/task'
import { User } from 'src/app/classes/user'

@Component({
  selector: 'app-task-dialog',
  templateUrl: './task-dialog.component.html',
  styleUrls: ['./task-dialog.component.scss']
})
export class TaskDialogComponent implements OnInit {
  public readonly task: Task<TaskType>
  public readonly users: User[]

  public constructor(@Inject(MAT_DIALOG_DATA) data: TaskAndUsersWithProgress) {
    this.task  = data.task
    this.users = data.users
  }

  public ngOnInit(): void { }

}
