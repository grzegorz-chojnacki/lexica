import { Component, Inject, OnInit } from '@angular/core'
import { MAT_DIALOG_DATA } from '@angular/material/dialog'
import { Task, TaskType } from 'src/app/classes/task'

@Component({
  selector: 'app-task-dialog',
  templateUrl: './task-dialog.component.html',
  styleUrls: ['./task-dialog.component.scss']
})
export class TaskDialogComponent implements OnInit {

  public constructor(@Inject(MAT_DIALOG_DATA) public data: Task<TaskType>) { }

  public ngOnInit(): void { }

}
