import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { Team } from 'src/app/classes/team'
import { User } from 'src/app/classes/user'
import { TeamHistoryService } from 'src/app/services/team-history.service'
import { UserService } from 'src/app/services/user.service'

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  public user!: User
  public teams!: Team[]

  public constructor(
    private readonly userService: UserService,
    private readonly teamHistory: TeamHistoryService,
    private readonly router: Router
  ) { }

  public redirectTo(team: Team): void {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['team', team.id])
    })
  }

  public ngOnInit(): void {
    this.userService.user.subscribe(user => this.user = user)
    this.teamHistory.teams.subscribe(teams => this.teams = teams)
  }
}
