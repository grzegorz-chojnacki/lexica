import { Component, OnInit, Input } from '@angular/core'
import { Task } from 'src/app/classes/task'
import { MultiTest } from 'src/app/classes/example'
import { TaskViewComponent } from '../task-view'
import { MatDialog } from '@angular/material/dialog'
import { TaskSummaryComponent } from '../../task-summary/task-summary.component'

type MultiTestControl = {
  example: MultiTest
  checkboxes: { option: string, value: boolean }[]
}

const hasElements    = (a: any[], b: any[]) => a.every(x => b.includes(x))
const areEqualLenght = (a: any[], b: any[]) => a.length === b.length

const isCorrect = (control: MultiTestControl) => {
  const answers = control.example.answers
  const checked = control.checkboxes
    .filter(c => c.value)
    .map(c => c.option)

  return (hasElements(checked, answers) && areEqualLenght(checked, answers))
}

@Component({
  selector: 'app-multi-test-view',
  templateUrl: './multi-test-view.component.html',
  styleUrls: ['./multi-test-view.component.scss']
})
export class MultiTestViewComponent extends TaskViewComponent implements OnInit {
  @Input() public task!: Task<MultiTest>

  public controls: MultiTestControl[] = []
  public readonly knewList = new Array<MultiTest>()

  public constructor(private readonly dialog: MatDialog) { super() }

  public ngOnInit(): void {
    this.controls = this.buildMultiTestControls()
  }

  private buildMultiTestControls(): MultiTestControl[] {
    return this.task.examples.map(example => {
      const options = [...example.answers, ...example.decoys]
      const checkboxes = options.map(option => ({ option, value: false }))
      return { example, checkboxes }
    })
  }

  public count(): void {
    this.controls.forEach(control => isCorrect(control) ? this.knewList.push(control.example) : this.knewList)
  }

  public sum(): void {
    this.count()
    this.dialog.open(TaskSummaryComponent, {
      disableClose: true,
      data: { knewList: this.knewList, task: this.task },
      width: '500px'
    }).afterClosed()
      .subscribe(progress => this.onSubmit.emit(progress))
  }
}