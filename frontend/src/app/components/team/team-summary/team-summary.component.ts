import { Component, Input, OnInit } from '@angular/core'
import { MatDialog } from '@angular/material/dialog'
import { Team } from 'src/app/classes/team'
import { TaskAddingComponent } from '../../task-adding/task-adding.component'

@Component({
  selector: 'app-team-summary',
  templateUrl: './team-summary.component.html',
  styleUrls: ['./team-summary.component.scss']
})
export class TeamSummaryComponent implements OnInit {
  @Input() public team!: Team

  public constructor(private readonly dialog: MatDialog) { }

  public ngOnInit(): void { }

  public openDialog(): void {
    this.dialog.open(TaskAddingComponent, { width: '500px' })
  }

}
