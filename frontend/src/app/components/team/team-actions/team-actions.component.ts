import { Component, Input, OnInit } from '@angular/core'
import { MatDialog } from '@angular/material/dialog'
import { Team } from 'src/app/classes/team'
import { TaskAddingComponent } from 'src/app/components/task/task-adding/task-adding.component'

@Component({
  selector: 'app-team-actions',
  templateUrl: './team-actions.component.html',
  styleUrls: ['./team-actions.component.scss']
})
export class TeamActionsComponent implements OnInit {
  @Input() public team!: Team

  public constructor(
    private readonly dialog: MatDialog) { }

  public ngOnInit(): void { }

  public newTaskDialog(): void {
    this.dialog.open(TaskAddingComponent, { width: '500px' })
  }
}
