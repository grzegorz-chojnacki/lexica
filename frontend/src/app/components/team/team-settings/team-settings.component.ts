import { Component, Inject, OnInit } from '@angular/core'
import { FormBuilder, FormControl } from '@angular/forms'
import { MAT_DIALOG_DATA } from '@angular/material/dialog'
import { Team } from 'src/app/classes/team'
import { TeamService } from 'src/app/services/team.service'

@Component({
  selector: 'app-team-settings',
  templateUrl: './team-settings.component.html',
  styleUrls: ['./team-settings.component.scss']
})
export class TeamSettingsComponent implements OnInit {
  public readonly teamForm = this.formBuilder.group({
    name: this.data.name,
    description: this.data.description,
    image: new FormControl({ value: this.data.image, disabled: true })
  })

  public constructor(
    private readonly formBuilder: FormBuilder,
    private readonly teamService: TeamService,
    @Inject(MAT_DIALOG_DATA) private data: Team) { }

  public ngOnInit(): void { }

  public submit(): void {
    this.teamService.updateTeam(this.data.id, this.teamForm.value)
  }
}
