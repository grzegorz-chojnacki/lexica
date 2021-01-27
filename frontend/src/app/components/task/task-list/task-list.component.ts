import { Component, Input, OnInit } from '@angular/core'
import { Task, Example } from 'src/app/classes/task'
import { MatDialog } from '@angular/material/dialog'
import { TaskDialogComponent } from 'src/app/components/task/task-dialog/task-dialog.component'
import { Team } from 'src/app/classes/team'
import { User } from 'src/app/classes/user'

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {
  @Input() public user!: User
  @Input() public team!: Team
  @Input() public leaderView!: boolean

  public constructor(private readonly dialog: MatDialog) { }

  public ngOnInit(): void { }

  public getUserProgress(task: Task<Example>): string {
    const progress = this.user.getTaskProgress(task).completion
    if (progress) {
      return `${this.user.getTaskProgress(task).completion}% wykonania`
    } else { return this.team.hasMember(this.user) ? 'Brak wyniku' : '' }
  }

  public launchTask(task: Task<Example>): void {
    this.dialog.open(TaskDialogComponent, {
      width: '500px',
      data: { task, team: this.team }
    })
  }
}
