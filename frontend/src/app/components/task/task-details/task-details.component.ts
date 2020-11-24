import { Component, Inject, OnInit } from '@angular/core'
import { MAT_DIALOG_DATA } from '@angular/material/dialog'
import { Task, TaskType, TaskAndUsersWithProgress } from 'src/app/classes/task'
import { User } from 'src/app/classes/user'

@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.scss']
})
export class TaskDetailsComponent implements OnInit {
  public readonly task: Task<TaskType>
  public readonly users: User[]

  public constructor(@Inject(MAT_DIALOG_DATA) data: TaskAndUsersWithProgress) {
    this.task  = data.task
    this.users = data.users
  }

  public numberOfUsersWithProgress(): number {
    return this.users
      .filter(user => user.getTaskProgress(this.task).value !== 0)
      .length
  }

  public ngOnInit(): void { }

}
