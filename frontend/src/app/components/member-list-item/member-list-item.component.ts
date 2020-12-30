import { Component, Input, OnInit } from '@angular/core'
import { Progress } from 'src/app/classes/progress'
import { Team } from 'src/app/classes/team'
import { User } from 'src/app/classes/user'
import { TeamService } from 'src/app/services/team.service'

@Component({
  selector: 'app-member-list-item',
  templateUrl: './member-list-item.component.html',
  styleUrls: ['./member-list-item.component.scss']
})
export class MemberListItemComponent implements OnInit {
  // Can be used for team progress (with list of every progress in some team)
  // or for specific task (with only one progress in list)
  @Input() public progress!: Progress[]
  @Input() public user!: User
  @Input() public team!: Team
  @Input() public leaderView = false

  public constructor(private readonly teamService: TeamService) { }

  public ngOnInit(): void { }

  public removeItself(): void {
    this.teamService.leaveTeam(this.team.id, this.user.id)
  }

  public getCompletion(): number {
    const sum = this.progress.reduce(Progress.sum, 0)
    return Math.round(sum / this.progress.length)
  }

}
