import { Component, OnInit } from '@angular/core'

import { TeamService } from 'src/app/services/team.service'
import { Team } from 'src/app/classes/team'

@Component({
  selector: 'app-workspace',
  templateUrl: './workspace.component.html',
  styleUrls: ['./workspace.component.scss']
})
export class WorkspaceComponent implements OnInit {
  public search = ''
  public teams: Team[] = []

  public constructor(private readonly teamService: TeamService) { }

  public ngOnInit(): void {
    this.teamService.teams.subscribe(teams => this.teams = teams)
  }

  public createTeam(): void { }

}
