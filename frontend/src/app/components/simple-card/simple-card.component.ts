import { Component, OnInit } from '@angular/core'

@Component({
  selector: 'app-simple-card',
  templateUrl: './simple-card.component.html',
  styleUrls: ['./simple-card.component.scss']
})
export class SimpleCardComponent implements OnInit {

  public constructor() { }

  public ngOnInit(): void {   
  }
  public nextCard() {
//go to another card, count progress
  }
}
