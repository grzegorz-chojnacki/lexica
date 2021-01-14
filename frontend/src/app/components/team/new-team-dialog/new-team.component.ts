import { Component, OnInit, ViewChild } from '@angular/core'
import { FormBuilder } from '@angular/forms'
import { MatTabGroup } from '@angular/material/tabs'

import { TeamService } from 'src/app/services/team.service'

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
    color: this.randomColor()
  })

  public constructor(
    private readonly formBuilder: FormBuilder,
    private readonly teamService: TeamService) { }

  public ngOnInit(): void { }

  private randomColor(): string {
    const randomHex = () => '0123456789ACBDEF'[Math.floor(Math.random() * 16)]
    return '#' + new Array(6).fill(0).map(randomHex).join('')
  }

  public submit(): void {
    if (this.tabGroup.selectedIndex === 0) {
      this.teamService.joinTeam(this.idForm.value.id)
    } else {
      this.teamService.createTeam(this.teamForm.value)
    }
  }
}
