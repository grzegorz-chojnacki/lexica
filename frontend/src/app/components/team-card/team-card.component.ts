import { Component, OnInit } from '@angular/core'

@Component({
  selector: 'app-team-card',
  templateUrl: './team-card.component.html',
  styleUrls: ['./team-card.component.scss']
})
export class TeamCardComponent implements OnInit {

  public name = 'Zespół'
  public description = 'Krótki opis zespołu'
  public image: ImageBitmap = new ImageBitmap()

  public constructor() { }

  public ngOnInit(): void { }

}
