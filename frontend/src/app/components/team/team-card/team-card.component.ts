import { Component, Input, OnInit } from '@angular/core'
import { MatSnackBar } from '@angular/material/snack-bar'

import { Team } from 'src/app/classes/team'
import { TeamService } from 'src/app/services/team.service'

@Component({
  selector: 'app-team-card',
  templateUrl: './team-card.component.html',
  styleUrls: ['./team-card.component.scss'],
})
export class TeamCardComponent implements OnInit {
  @Input() public team!: Team
  @Input() public context!: 'TeamContainer' | 'Team'

  public constructor(
    private readonly snackbarService: MatSnackBar,
    private readonly teamService: TeamService) { }

  public ngOnInit(): void { }

  public removeItself(): void { this.teamService.remove(this.team) }

  public copyToClipboard(): void {
    navigator.clipboard.writeText(this.team.id)
    this.snackbarService
      .open('Skopiowano do schowka!', undefined, { duration: 2000 })
  }
}
