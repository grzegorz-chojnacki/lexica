import { Component, OnInit } from '@angular/core'
import { Team } from 'src/app/classes/team'

@Component({
  selector: 'app-workspace',
  templateUrl: './workspace.component.html',
  styleUrls: ['./workspace.component.scss']
})
export class WorkspaceComponent implements OnInit {
  public teams: Team[] = Array(4).fill(new Team('Zespół'))
  public search = ''

  public constructor() { }

  public ngOnInit(): void { }

  public createTeam(): void { }

}
