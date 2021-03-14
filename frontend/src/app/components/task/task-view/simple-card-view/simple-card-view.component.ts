import { Component, Input, OnInit } from '@angular/core'
import { MatDialog } from '@angular/material/dialog'
import { Task } from 'src/app/classes/task'
import { TaskSummaryComponent } from '../../task-summary/task-summary.component'
import { DataService } from 'src/app/services/data.service'
import { SimpleCard } from 'src/app/classes/example'
import { TaskViewComponent } from '../task-view'

@Component({
  selector: 'app-simple-card-view',
  templateUrl: './simple-card-view.component.html',
  styleUrls: ['./simple-card-view.component.scss']
})
export class SimpleCardViewComponent extends TaskViewComponent implements OnInit {
  @Input() public task!: Task<SimpleCard>

  public readonly knewList = new Array<SimpleCard>()
  public counter = 0
  public message!: string | null

  public constructor(
    private readonly data: DataService,
    private readonly dialog: MatDialog
  ) { super() }

  public ngOnInit(): void {
    this.data.currentMessage.subscribe(message => this.message = message)
  }

  public nextCard(knew: boolean): void {
    if (knew) { this.knewList.push(this.task.examples[this.counter]) }

    if (this.counter < this.task.examples.length - 1) {
      this.counter++
    } else {
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
}
