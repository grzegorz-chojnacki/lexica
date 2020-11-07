import { Component, OnInit } from '@angular/core'
import { SimpleCard } from 'src/app/classes/simple-card'

@Component({
  selector: 'app-simple-card',
  templateUrl: './simple-card.component.html',
  styleUrls: ['./simple-card.component.scss']
})
export class SimpleCardComponent implements OnInit {

  public simpleCard: SimpleCard = new SimpleCard('Fire', 'Ogień', 'dd')
  public counter = 1
  public constructor() { }

  public ngOnInit(): void { }
  public nextCard(): void {
    // Go to another card, count progress
    this.simpleCard.englishWord = 'Next word' + this.counter
    this.counter++
  }
}
