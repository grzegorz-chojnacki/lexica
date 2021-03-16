import { Component, OnInit, ViewChild } from '@angular/core'
import { FormBuilder, FormControl, Validators } from '@angular/forms'
import { MatSnackBar } from '@angular/material/snack-bar'
import { MatTabGroup } from '@angular/material/tabs'
import { randomColor } from 'src/app/classes/utils'
import { snackBarDuration } from 'src/app/lexica.properties'
import { TeamService } from 'src/app/services/team.service'

@Component({
  selector: 'app-new-team',
  templateUrl: './new-team.component.html',
  styleUrls: ['./new-team.component.scss']
})
export class NewTeamComponent implements OnInit {
  @ViewChild(MatTabGroup) private tabGroup!: MatTabGroup
  private readonly uuidRegex = /[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}/

  public readonly idForm = this.formBuilder.group({
    id: new FormControl('', [
      Validators.required,
      Validators.pattern(this.uuidRegex)
    ])
  })

  public readonly teamForm = this.formBuilder.group({
    name: new FormControl('', [Validators.required]),
    description: '',
    color: randomColor()
  })

  public constructor(
    private readonly snackbarService: MatSnackBar,
    private readonly formBuilder: FormBuilder,
    private readonly teamService: TeamService) { }

  public ngOnInit(): void { }

  public isInvalidTab = () => (this.tabGroup?.selectedIndex === 0)
    ? this.idForm.invalid
    : this.teamForm.invalid

  public submit(): void {
    if (this.tabGroup.selectedIndex === 0) {
      this.teamService.joinTeam(this.idForm.value.id)
    } else {
      this.teamService.createTeam(this.teamForm.value)
    }

    this.snackbarService
      .open('Dodano zespół!', undefined, { duration: snackBarDuration })
  }
}
