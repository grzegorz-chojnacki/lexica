import { Component, Inject, OnInit } from '@angular/core'
import { MAT_DIALOG_DATA } from '@angular/material/dialog'
import { SimpleCard, Task } from 'src/app/classes/task'

@Component({
  selector: 'app-task-summary',
  templateUrl: './task-summary.component.html',
  styleUrls: ['./task-summary.component.scss']
})
export class TaskSummaryComponent implements OnInit {
  public notKnownWords = new Array<SimpleCard>()
  public task!: Task<SimpleCard>

  public constructor(@Inject(MAT_DIALOG_DATA)
    data: ({ knewList: SimpleCard[], task: Task<SimpleCard> })) {
    this.notKnownWords = data.task.examples
      .filter(example => !data.knewList.includes(example))
    this.task = data.task
  }

  public ngOnInit(): void { }
}
