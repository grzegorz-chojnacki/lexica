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

  public taskCompletion(task: Task<TaskType>): number {
    const taskProgress = this.team.getTaskProgress(task)
    const sum = taskProgress.reduce(Progress.sum, 0)

    return sum / this.team.users.length
  }

  public ngOnInit(): void {
    this.userService.loggedUser.subscribe(user => this.user = user)

    const teamHash = this.route.snapshot.paramMap.get('hash')

    this.teamService
      .getTeam(teamHash)
      .then(team => this.team = team)
      .catch(err => this.router.navigate(['/']))
  }

}
