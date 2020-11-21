import { Component, Input, OnInit, ViewChild } from '@angular/core'
import { MatDialog } from '@angular/material/dialog'
import { MatMenu } from '@angular/material/menu'
import { Task, TaskType } from 'src/app/classes/task'
import { TaskSummaryComponent } from '../task-summary/task-summary.component'

@Component({
  selector: 'app-task-menu',
  templateUrl: './task-menu.component.html',
  styleUrls: ['./task-menu.component.scss']
})
export class TaskMenuComponent implements OnInit {
  @Input() public task!: Task<TaskType>
  @ViewChild(MatMenu, { static: true }) public readonly menu!: MatMenu

  public constructor(private readonly dialog: MatDialog) { }

  public ngOnInit(): void { }

  public taskDescription(): void {
    this.dialog.open(TaskSummaryComponent, { width: '500px' })
  }
}
