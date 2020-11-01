import { Component, Input, OnInit } from '@angular/core'
import { Team } from 'src/app/classes/team'
import { TeamService } from 'src/app/services/team.service'

@Component({
  selector: 'app-team-card',
  templateUrl: './team-card.component.html',
  styleUrls: ['./team-card.component.scss']
})
export class TeamCardComponent implements OnInit {
  @Input() public team!: Team

  public constructor(private readonly teamService: TeamService) { }

  public ngOnInit(): void { }

  public removeItself(): void {
    this.teamService.remove(this.team)
  }

}
