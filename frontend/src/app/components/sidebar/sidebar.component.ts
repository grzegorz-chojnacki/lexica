import { Component, OnInit } from '@angular/core'
import { AccountComponent } from '../account/account.component'
import { TeamService } from 'src/app/services/team.service'
import { Team } from 'src/app/classes/team'

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})

export class SidebarComponent implements OnInit {
  public userAccount: AccountComponent = new AccountComponent()
  public teams: Team[] = []

  public constructor(private readonly teamService: TeamService) { }
  public ngOnInit(): void {
  this.teamService.teams.subscribe(teams => this.teams = teams)
  }

  // console.log(this.av);

}
