import { Component, OnInit } from '@angular/core'
import { SimpleCard } from 'src/app/classes/task'

@Component({
  selector: 'app-simple-card',
  templateUrl: './simple-card.component.html',
  styleUrls: ['./simple-card.component.scss']
})
export class SimpleCardComponent implements OnInit {

  public simpleCard: SimpleCard = new SimpleCard('Ogień', 'Fire')
  public counter = 1
  public constructor() { }

  public ngOnInit(): void { }
  public nextCard(): void {
    // Go to another card, count progress
    // this.simpleCard.foreignWord = 'Next word' + this.counter
    this.counter++
  }
}
