import { Component, Inject, OnInit } from '@angular/core'
import { MAT_DIALOG_DATA } from '@angular/material/dialog'
import { SimpleCard, ChoiceTest, Example } from 'src/app/classes/example'
import { Progress } from 'src/app/classes/progress'
import { Task } from 'src/app/classes/task'

type AttemptSummary = { knewList: SimpleCard[], task: Task<SimpleCard> }

@Component({
  selector: 'app-task-summary',
  templateUrl: './task-summary.component.html',
  styleUrls: ['./task-summary.component.scss']
})
export class TaskSummaryComponent implements OnInit {
  public readonly notKnownWords: any
  public readonly task!: Task<Example>
  public readonly completion: number

  public constructor(@Inject(MAT_DIALOG_DATA) data: AttemptSummary) {
    if (data.task.type.name === 'Fiszka') {
      this.notKnownWords = new Array<SimpleCard>()
    }else { this.notKnownWords = new Array<ChoiceTest>()}
    this.notKnownWords = data.task.examples
      .filter(example => !data.knewList.includes(example))
    this.task = data.task
    this.completion = this.getCompletion(data.knewList.length, data.task.examples.length)
  }

  private getCompletion(a: number, b: number): number {
    return Math.floor(a / b * 100)
  }

  public ngOnInit(): void { }

  public getProgress(): Progress {
    return new Progress(this.task, this.completion)
  }
}
