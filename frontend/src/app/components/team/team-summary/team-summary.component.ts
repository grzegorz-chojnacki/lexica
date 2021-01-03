import { Component, Input, OnInit } from '@angular/core'
import { MatDialog } from '@angular/material/dialog'
import { MatSlideToggleChange } from '@angular/material/slide-toggle'
import { Team } from 'src/app/classes/team'
import { TaskAddingComponent } from 'src/app/components/task/task-adding/task-adding.component'
import { TeamService } from 'src/app/services/team.service'

@Component({
  selector: 'app-team-summary',
  templateUrl: './team-summary.component.html',
  styleUrls: ['./team-summary.component.scss']
})
export class TeamSummaryComponent implements OnInit {
  @Input() public team!: Team

  public constructor(
    private readonly teamService: TeamService,
    private readonly dialog: MatDialog) { }

  public ngOnInit(): void { }

  public toggleLeaderProgressActivation(event: MatSlideToggleChange): void {
    event.checked
      ? this.teamService.joinTeam(this.team.id)
      : this.teamService.leaveTeam(this.team)
  }

  public isLeaderProgressActivated(): boolean {
    return this.team.members.find(user => user.id === this.team.leader.id) !== undefined
  }

  public newTaskDialog(): void {
    this.dialog.open(TaskAddingComponent, { width: '500px' })
  }

  public acceptMembersDialog(): void { }

}
