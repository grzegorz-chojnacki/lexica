import { Component, Input, OnInit } from '@angular/core'
import { Task, Example } from 'src/app/classes/task'
import { MatDialog } from '@angular/material/dialog'
import { TaskDialogComponent } from 'src/app/components/task/task-dialog/task-dialog.component'
import { Progress } from 'src/app/classes/progress'
import { Team } from 'src/app/classes/team'

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {
  @Input() public team!: Team

  public constructor(private readonly dialog: MatDialog) { }

  public ngOnInit(): void { }

  public getTeamProgress(task: Task<Example>): number {
    const sum = this.team.members
      .map(user => user.getTaskProgress(task))
      .reduce(Progress.sum, 0)

    return Math.round(sum / this.team.members.length)
  }

  public launchTask(task: Task<Example>): void {
    this.dialog.open(TaskDialogComponent, {
        width: '500px',
        data: { task, users: this.team.members }
      })
  }
}
