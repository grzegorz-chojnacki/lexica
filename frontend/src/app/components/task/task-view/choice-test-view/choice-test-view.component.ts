import { Component, OnInit, Input } from '@angular/core'
import { Task } from 'src/app/classes/task'
import { ChoiceTest } from 'src/app/classes/example'
import { newArray } from '@angular/compiler/src/util'
import { TaskViewComponent } from '../task-view'
import { MatDialog } from '@angular/material/dialog'
import { TaskSummaryComponent } from '../../task-summary/task-summary.component'


@Component({
  selector: 'app-choice-test-view',
  templateUrl: './choice-test-view.component.html',
  styleUrls: ['./choice-test-view.component.scss']
})
export class ChoiceTestViewComponent extends TaskViewComponent implements OnInit {
  @Input() public task!: Task<ChoiceTest>

  public correctAnswer!: Array<string>
  public readonly knewList = new Array<ChoiceTest>()
  public constructor(private readonly dialog: MatDialog) { super() }

  public ngOnInit(): void {
    // correct answer added
    this.task.examples.filter(example => example.decoys.push(example.answer))
    // random order of answers
    this.task.examples.filter(ex => ex.decoys.sort((a, b) => 0.5 - Math.random()))
    this.correctAnswer = newArray(this.task.examples.length)
  }
public sum(): void {
  for (let i = 0; i < this.task.examples.length; i++) {
  if (this.correctAnswer[i] === this.task.examples[i].answer)
  {
    console.log('dobrze' + this.correctAnswer[i] )
    this.knewList.push(this.task.examples[i])
  }
}
 // console.log('razem:' + this.counter)
  this.dialog.open(TaskSummaryComponent, {
    disableClose: true,
    data: {
      knewList: this.knewList,
      task: this.task
    },
    width: '500px'
  }).afterClosed().subscribe(progress => this.onSubmit.emit(progress))
}
}
