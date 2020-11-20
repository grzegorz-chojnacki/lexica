import { Component, Input, OnInit } from '@angular/core'
import { Task, TaskType } from 'src/app/classes/task'
import { TaskSummaryComponent } from 'src/app/components/task-summary/task-summary.component'
import { MatDialog } from '@angular/material/dialog'

@Component({
  selector: 'app-task-list-item',
  templateUrl: './task-list-item.component.html',
  styleUrls: ['./task-list-item.component.scss']
})
export class TaskListItemComponent implements OnInit {
  @Input() public task!: Task<TaskType>
  @Input() public completion!: number

  public constructor(private readonly dialog: MatDialog) { }

  public launchTask(event: Event): void { event.stopPropagation() }

  public taskDescription(): void {
    this.dialog.open(TaskSummaryComponent, { width: '500px' })
    console.log('task summary')
  }

  public ngOnInit(): void { }

}
