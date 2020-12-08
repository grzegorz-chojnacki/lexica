import { Component, OnInit } from '@angular/core'
import { Router, ActivatedRoute } from '@angular/router'

import { Team } from 'src/app/classes/team'
import { TeamService } from 'src/app/services/team.service'
import { UserService } from 'src/app/services/user.service'
import { User } from 'src/app/classes/user'
import { zip } from 'rxjs'

@Component({
  selector: 'app-team-view',
  templateUrl: './team-view.component.html',
  styleUrls: ['./team-view.component.scss']
})
export class TeamViewComponent implements OnInit {
  public team!: Team
  public user!: User
  public leaderView = false

  public constructor(
    private router: Router,
    private route: ActivatedRoute,
    private teamService: TeamService,
    private userService: UserService) { }

  public ngOnInit(): void {
    const teamId = this.route.snapshot.paramMap.get('teamId')
    zip(this.userService.user, this.teamService.getTeam(teamId))
      .subscribe(([user, team]) => {
        this.user = user
        this.team = team
        this.leaderView = team.leader.id === user.id
      }, err  => this.router.navigate(['/']))
  }

}
