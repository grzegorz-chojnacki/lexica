import { Component, OnInit, ViewChild } from '@angular/core'
import { FormBuilder, FormControl } from '@angular/forms'
import { MatTabGroup } from '@angular/material/tabs'

import { TeamListService, TeamForm } from 'src/app/services/team-list.service'

@Component({
  selector: 'app-new-team',
  templateUrl: './new-team.component.html',
  styleUrls: ['./new-team.component.scss']
})
export class NewTeamComponent implements OnInit {
  @ViewChild(MatTabGroup) private tabGroup!: MatTabGroup

  public readonly idForm = this.formBuilder.group({ id: '' })
  public readonly teamForm = this.formBuilder.group({
    name: '',
    description: '',
    image: new FormControl({ value: '', disabled: true })
  })

  public constructor(
    private readonly formBuilder: FormBuilder,
    private readonly teamService: TeamListService) { }

  public ngOnInit(): void { }

  public submit(): void {
    if (this.tabGroup.selectedIndex === 0) {
      this.teamService.joinTeam(this.idForm.value.id)
    } else {
      this.teamService.createTeam(this.teamForm.value as TeamForm)
    }
  }

}
