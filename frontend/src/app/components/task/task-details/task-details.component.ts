import { Component, Inject, OnInit } from '@angular/core'
import { MAT_DIALOG_DATA } from '@angular/material/dialog'
import { Task, TaskType } from 'src/app/classes/task'

@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.scss']
})
export class TaskDetailsComponent implements OnInit {

  public constructor(@Inject(MAT_DIALOG_DATA) public readonly data: Task<TaskType>) { }

  public ngOnInit(): void { }

}
