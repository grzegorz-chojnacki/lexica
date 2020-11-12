import { Component, OnInit } from '@angular/core'
import { Router, ActivatedRoute } from '@angular/router'
import { Progress } from 'src/app/classes/progress'
import { Task, TaskType } from 'src/app/classes/task'
import { Team } from 'src/app/classes/team'
import { TeamService } from 'src/app/services/team.service'
import { PreviousRouteService } from 'src/app/services/previous-route.service'

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss']
})
export class TeamComponent implements OnInit {
  public team!: Team

  public constructor(
    private router: Router,
    private route: ActivatedRoute,
    private teamService: TeamService,
    private previousRouteService: PreviousRouteService ) { }

  public taskSummary(task: Task<TaskType>): number {
    const taskProgress = this.team.getTaskProgress(task)
    const sum = taskProgress.reduce(Progress.sum, 0)

    return sum / this.team.users.length
  }

  public ngOnInit(): void {
    const teamHash = this.route.snapshot.paramMap.get('hash')

    this.teamService
      .getTeam(teamHash)
      .then(team => this.team = team)
      .catch(err => this.router.navigate(['/']))
  }

}
