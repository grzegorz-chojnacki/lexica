import { Component, OnInit } from '@angular/core'
import { Team } from 'src/app/classes/team'

@Component({
  selector: 'app-new-team',
  templateUrl: './new-team.component.html',
  styleUrls: ['./new-team.component.scss']
})
export class NewTeamComponent implements OnInit {
  public result!: Team | string

  public constructor() { }

  public ngOnInit(): void { }

}
