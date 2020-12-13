import { Component, OnInit } from '@angular/core'
import { SimpleCard, Task } from 'src/app/classes/task'
// import { SimpleCardComponent } from 'src/app/components/task/simple-card/simple-card.component'

@Component({
  selector: 'app-task-summary',
  templateUrl: './task-summary.component.html',
  styleUrls: ['./task-summary.component.scss']
})
export class TaskSummaryComponent implements OnInit {

  public progres = 1
  public percentageProgress = 0
  public notKnownWords: SimpleCard[] = new Array()
  public task!: Task<SimpleCard>

  public array(n: number): any[] {
    return Array(n)
  }
  public constructor() { }

  public ngOnInit(): void {
  }

}
