import { Component, Inject, OnInit } from '@angular/core'
import { FormBuilder, FormControl } from '@angular/forms'
import { MAT_DIALOG_DATA } from '@angular/material/dialog'
import { MatSlideToggleChange } from '@angular/material/slide-toggle'
import { Team } from 'src/app/classes/team'
import { TeamService } from 'src/app/services/team.service'

@Component({
  selector: 'app-team-settings',
  templateUrl: './team-settings.component.html',
  styleUrls: ['./team-settings.component.scss']
})
export class TeamSettingsComponent implements OnInit {
  public readonly teamForm = this.formBuilder.group({
    name: this.team.name,
    description: this.team.description,
    image: new FormControl({ value: this.team.image, disabled: true })
  })

  public constructor(
    private readonly formBuilder: FormBuilder,
    private readonly teamService: TeamService,
    @Inject(MAT_DIALOG_DATA) private team: Team) { }


  public toggleLeaderProgressActivation(event: MatSlideToggleChange): void {
    event.checked
      ? this.teamService.joinTeam(this.team.id)
      : this.teamService.leaveTeam(this.team)
  }

  public isLeaderProgressActivated(): boolean {
    return this.team.members
      .find(user => user.id === this.team.leader.id) !== undefined
  }

  public ngOnInit(): void { }

  public submit(): void {
    this.teamService.updateTeam(this.team.id, this.teamForm.value)
  }
}
