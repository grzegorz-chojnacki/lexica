import { Component, Input, OnInit } from '@angular/core'
import { Example } from 'src/app/classes/example'
import { Progress } from 'src/app/classes/progress'
import { Task } from 'src/app/classes/task'
import { Team } from 'src/app/classes/team'
import { User } from 'src/app/classes/user'
import { TeamService } from 'src/app/services/team.service'
import { UserService } from 'src/app/services/user.service'

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.scss']
})
export class MemberListComponent implements OnInit {
  public user!: User
  @Input() public team!: Team
  @Input() public leaderView = false
  // When set, progress is calculated only for this task, or else for every task
  @Input() public task?: Task<Example>

  public constructor(
    private readonly teamService: TeamService,
    private readonly userService: UserService) { }

  public ngOnInit(): void {
  this.userService.user.subscribe(u => this.user = u)
}

  public removeMember(member: User): void {
    this.teamService.leaveTeam(this.team, member)
  }

  public getCompletion(user: User): number {
    if (this.task) {
      return user.getTaskProgress(this.task).completion || 0
    } else if (this.team.tasks.length > 0) {
      const progress = this.team.tasks.map(task => user.getTaskProgress(task))
      return Math.round(progress.reduce(Progress.sum, 0) / progress.length)
    } else { return 0 }
  }
}
