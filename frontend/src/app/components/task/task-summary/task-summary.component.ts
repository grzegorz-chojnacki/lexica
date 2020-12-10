import { Component, OnInit } from '@angular/core'
//import { SimpleCardComponent } from 'src/app/components/task/simple-card/simple-card.component'

@Component({
  selector: 'app-task-summary',
  templateUrl: './task-summary.component.html',
  styleUrls: ['./task-summary.component.scss']
})
export class TaskSummaryComponent implements OnInit {

  public progres = 1
  public percentageProgress = 0
  public array(n: number): any[] {
    return Array(n)
  }
  public constructor() { }

  public ngOnInit(): void {
  }

}
