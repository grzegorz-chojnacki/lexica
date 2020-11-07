import { Component, OnInit } from '@angular/core'
import { Router, ActivatedRoute } from '@angular/router'
import { Team } from 'src/app/classes/team'
import { TeamService } from 'src/app/services/team.service'

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss']
})
export class TeamComponent implements OnInit {
  public team!: Team

  public constructor(
    private router: Router,
    private route: ActivatedRoute,
    private teamService: TeamService) { }

  public ngOnInit(): void {
    const teamHash = this.route.snapshot.paramMap.get('hash')

    this.teamService
      .getTeam(teamHash)
      .then(team => this.team = team)
      .catch(err => this.router.navigate(['/']))
  }

}
