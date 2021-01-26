import { Component, OnInit } from '@angular/core'
import { Router, ActivatedRoute } from '@angular/router'

import { Team } from 'src/app/classes/team'
import { TeamService } from 'src/app/services/team.service'
import { UserService } from 'src/app/services/user.service'
import { User } from 'src/app/classes/user'
import { BreadCrumbService } from 'src/app/services/bread-crumb.service'

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
    private readonly userService: UserService,
    private readonly breadCrumbService: BreadCrumbService) { }

  public ngOnInit(): void {
    const isLeader = () => this.team?.leader?.id === this.user?.id
    const teamId = this.route.snapshot.paramMap.get('teamId')

    this.userService.user.subscribe(user => {
      this.user = user
      this.leaderView = isLeader()
    })

    this.teamService.getTeam(teamId).subscribe(team => {
      this.team = team
      this.breadCrumbService.setTeam(team.id)
      this.leaderHasProgressView = team.isMember(this.user)
      this.leaderView = isLeader()
      this.loggedUserWithProgress = team.members
        .find(member => member.id === this.user.id) || this.loggedUserWithProgress
    }, _ => this.router.navigate(['/']))
  }
}
