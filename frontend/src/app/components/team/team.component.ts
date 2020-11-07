import { Component, OnInit } from '@angular/core'
import { Team } from 'src/app/classes/team'
import { TeamService, testTeams } from 'src/app/services/team.service'

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss']
})
export class TeamComponent implements OnInit {

  public readonly team: Team = testTeams[0]

  public constructor(private teamService: TeamService) { }

  public ngOnInit(): void { }

}
