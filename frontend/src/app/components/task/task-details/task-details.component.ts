import { Component, Inject, OnInit } from '@angular/core'
import { MAT_DIALOG_DATA } from '@angular/material/dialog'
import { Example } from 'src/app/classes/example'
import { Progress } from 'src/app/classes/progress'
import { Task, TaskAndUsersWithProgress } from 'src/app/classes/task'
import { Team } from 'src/app/classes/team'

@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.scss']
})
export class TaskDetailsComponent implements OnInit {
  public readonly task: Task<Example>
  public readonly team: Team

  public constructor(@Inject(MAT_DIALOG_DATA) data: TaskAndUsersWithProgress) {
    this.task = data.task
    this.team = data.team
  }

  public getUsersWithProgress(): string {
    const usersWithProgress = this.team.members
      .filter(user => (user.getTaskProgress(this.task).completion || 0) > 0)
      .length
    return `${usersWithProgress}/${this.team.members.length}`
  }

  public getAverageTeamProgress(): number {
    const sum = this.team.members
      .map(user => user.getTaskProgress(this.task))
      .reduce(Progress.sum, 0)

    return Math.round(sum / this.team.members.length)
  }

  public ngOnInit(): void { }

}
