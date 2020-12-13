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
  public simpleCard: SimpleCard = new SimpleCard('bottleneck', 'wąskie gardło')
  public simpleCards: SimpleCard[] = [this.simpleCard, new SimpleCard('browser', 'przeglądarka')
  , new SimpleCard('chunk', 'znaczna część'), new SimpleCard('circuit failure', 'uszkodzenie przewodu'),
  new SimpleCard('data encapsulation', 'obudowywanie danych'), new SimpleCard('destination', 'miejsce docelowe')]
  public counter = 1
  public progress = 0

  public constructor(private readonly dialog: MatDialog) { }

  public ngOnInit(): void { }

  public nextCard(): void {
    // Go to another card, count progress
    // this.simpleCard.foreignWord = 'Next word' + this.counter

    console.log('progres' + this.progress)
    if (this.counter < this.simpleCards.length) {
      this.counter++
    }
    else
    if (this.counter === this.simpleCards.length) {
    const dialogRef = this.dialog.open(TaskSummaryComponent, { width: '500px' })
    const instance = dialogRef.componentInstance
    instance.progres = this.simpleCards.length - this.progress
    }
  }
}
