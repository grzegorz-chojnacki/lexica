import { Component, OnInit } from '@angular/core'
import { SimpleCard } from 'src/app/classes/task'
import { PreviousRouteService } from 'src/app/services/previous-route.service'

@Component({
  selector: 'app-simple-card',
  templateUrl: './simple-card.component.html',
  styleUrls: ['./simple-card.component.scss']
})
export class SimpleCardComponent implements OnInit {

  public simpleCard: SimpleCard = new SimpleCard('Ogień', 'Fire')
  public counter = 1
  public constructor(private previousRouteService: PreviousRouteService) { }

  public ngOnInit(): void { console.log(this.previousRouteService.getPreviousUrl()) }
  public nextCard(): void {
    // Go to another card, count progress
    // this.simpleCard.foreignWord = 'Next word' + this.counter
    this.counter++
  }
}
