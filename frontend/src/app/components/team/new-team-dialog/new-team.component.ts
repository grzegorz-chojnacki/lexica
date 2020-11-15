import { Component, OnInit, ViewChild } from '@angular/core'
import { FormBuilder, FormControl } from '@angular/forms'
import { MatTabGroup } from '@angular/material/tabs'

import { TeamService, TeamForm } from 'src/app/services/team.service'

@Component({
  selector: 'app-new-team',
  templateUrl: './new-team.component.html',
  styleUrls: ['./new-team.component.scss']
})
export class NewTeamComponent implements OnInit {
  @ViewChild(MatTabGroup) private tabGroup!: MatTabGroup

  public readonly hashForm = this.formBuilder.group({ hash: '' })
  public readonly teamForm = this.formBuilder.group({
    name: '',
    description: '',
    image: new FormControl({ value: '', disabled: true })
  })

  public constructor(
    private readonly formBuilder: FormBuilder,
    private readonly teamService: TeamService) { }

  public ngOnInit(): void { }

  public submit(): void {
    if (this.tabGroup.selectedIndex === 0) {
      this.teamService.joinTeam(this.hashForm.value.hash)
    } else {
      this.teamService.createTeam(this.teamForm.value as TeamForm)
    }
  }

}
