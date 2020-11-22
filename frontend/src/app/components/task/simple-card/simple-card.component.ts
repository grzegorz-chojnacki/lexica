import { Component, OnInit } from '@angular/core'
import { SimpleCard } from 'src/app/classes/task'
import { TaskSummaryComponent } from '../task-summary/task-summary.component'
import { MatDialog } from '@angular/material/dialog'
@Component({
  selector: 'app-simple-card',
  templateUrl: './simple-card.component.html',
  styleUrls: ['./simple-card.component.scss']
})
export class SimpleCardComponent implements OnInit {
  public simpleCard: SimpleCard = new SimpleCard('Ogień', 'Fire')
  public counter = 1

  public constructor(private readonly dialog: MatDialog) { }

  public ngOnInit(): void { }

  public nextCard(): void {
    // Go to another card, count progress
    // this.simpleCard.foreignWord = 'Next word' + this.counter
    this.counter++
    if (this.counter === 10) {
    this.dialog.open(TaskSummaryComponent, { width: '500px' })
    }
  }
}
