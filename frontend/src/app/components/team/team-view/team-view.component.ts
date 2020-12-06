import { Component, OnInit } from '@angular/core'
import { Router, ActivatedRoute } from '@angular/router'

import { Progress } from 'src/app/classes/progress'
import { Task, TaskType } from 'src/app/classes/task'
import { Team } from 'src/app/classes/team'
import { TeamService } from 'src/app/services/team.service'
import { UserService } from 'src/app/services/user.service'
import { User } from 'src/app/classes/user'

@Component({
  selector: 'app-team-view',
  templateUrl: './team-view.component.html',
  styleUrls: ['./team-view.component.scss']
})
export class TeamViewComponent implements OnInit {
  public team!: Team
  public user!: User

  public constructor(
    private router: Router,
    private route: ActivatedRoute,
    private teamService: TeamService,
    private userService: UserService) { }

  public ngOnInit(): void {
    this.userService.loggedUser.subscribe(user => this.user = user)

    const teamId = this.route.snapshot.paramMap.get('teamId')

    this.teamService
      .getTeam(teamId)
      .subscribe(
        team => this.team = team,
        err  => this.router.navigate(['/'])
      )
  }

}
