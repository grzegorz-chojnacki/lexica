import { Component, Input, OnInit } from '@angular/core'
import { Team } from 'src/app/classes/team'

@Component({
  selector: 'app-team-container',
  templateUrl: './team-container.component.html',
  styleUrls: ['./team-container.component.scss']
})
export class TeamContainerComponent implements OnInit {
  @Input() public title!: string
  @Input() public teams!: Team[]

  public constructor() { }

  public ngOnInit(): void { }

}
