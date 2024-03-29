import { Component, OnInit } from '@angular/core'
import { Router, ActivatedRoute } from '@angular/router'

import { Team } from 'src/app/classes/team'
import { TeamService } from 'src/app/services/team.service'
import { UserService } from 'src/app/services/user.service'
import { User } from 'src/app/classes/user'
import { combineLatest } from 'rxjs'

@Component({
  selector: 'app-team-view',
  templateUrl: './team-view.component.html',
  styleUrls: ['./team-view.component.scss']
})
export class TeamViewComponent implements OnInit {
  public team!: Team
  public user!: User
  public leaderView = false
  public leaderHasProgressView = false
  public loggedUserWithProgress = this.userService.emptyUser

  public constructor(
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly teamService: TeamService,
    private readonly userService: UserService
  ) { }

  public ngOnInit(): void {
    const isLeader = () => this.team?.leader?.id === this.user?.id
    const teamId = this.route.snapshot.paramMap.get('teamId')

    combineLatest([this.userService.user, this.teamService.getTeam(teamId)])
      .subscribe(([user, team]) => {
        this.user = user
        this.team = team
        this.leaderView = isLeader()
        this.leaderHasProgressView = team.hasMember(this.user)
        this.loggedUserWithProgress = this.getLoggedUserFromTeam(team)
      }, _ => this.router.navigate(['/workspace']))
  }

  private getLoggedUserFromTeam(team: Team): User {
    return team.members.find(member => member.id === this.user.id)
      || this.loggedUserWithProgress
  }
}
