import { Component, Inject, OnInit } from '@angular/core'
import { MAT_DIALOG_DATA } from '@angular/material/dialog'
import { Task, Example, TaskAndUsersWithProgress } from 'src/app/classes/task'
import { Team } from 'src/app/classes/team'

@Component({
  selector: 'app-task-dialog',
  templateUrl: './task-dialog.component.html',
  styleUrls: ['./task-dialog.component.scss']
})
export class TaskDialogComponent implements OnInit {
  public readonly task: Task<Example>
  public readonly team: Team

  public constructor(@Inject(MAT_DIALOG_DATA) data: TaskAndUsersWithProgress) {
    this.task  = data.task
    this.team = data.team
  }

  public ngOnInit(): void { }

}
