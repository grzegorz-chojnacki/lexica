import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormControl } from '@angular/forms'

import { TeamService, TeamForm } from 'src/app/services/team.service'

@Component({
  selector: 'app-new-team',
  templateUrl: './new-team.component.html',
  styleUrls: ['./new-team.component.scss']
})
export class NewTeamComponent implements OnInit {

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
    this.teamService.createTeam(this.teamForm.value as TeamForm)
  }

}
