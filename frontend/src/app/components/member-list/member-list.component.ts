import { Component, Input, OnInit } from '@angular/core'
import { Progress } from 'src/app/classes/progress'
import { Team } from 'src/app/classes/team'
import { User } from 'src/app/classes/user'
import { TeamService } from 'src/app/services/team.service'

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.scss']
})
export class MemberListComponent implements OnInit {
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
    if (this.progress.length > 0) {
      const sum = this.progress.reduce(Progress.sum, 0)
      return Math.round(sum / this.progress.length)
    } else {
      return 0
    }
  }

}
