import { Component, Inject, OnInit } from '@angular/core'
import { MAT_DIALOG_DATA } from '@angular/material/dialog'
import { Progress } from 'src/app/classes/progress'
import { SimpleCard, Task } from 'src/app/classes/task'

type AttemptSummary = { knewList: SimpleCard[], task: Task<SimpleCard> }

@Component({
  selector: 'app-task-summary',
  templateUrl: './task-summary.component.html',
  styleUrls: ['./task-summary.component.scss']
})
export class TaskSummaryComponent implements OnInit {
  public readonly notKnownWords = new Array<SimpleCard>()
  public readonly task!: Task<SimpleCard>
  public readonly completed: number

  public constructor(@Inject(MAT_DIALOG_DATA) data: AttemptSummary) {
    this.notKnownWords = data.task.examples
      .filter(example => !data.knewList.includes(example))
    this.task = data.task
    this.completed = data.knewList.length
  }

  public ngOnInit(): void { }

  public getProgress(): Progress {
    return new Progress(this.task, this.completed)
  }
}
