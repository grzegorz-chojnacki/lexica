import { Component, Inject, OnInit } from '@angular/core'
import { FormBuilder, FormControl, Validators } from '@angular/forms'
import { MAT_DIALOG_DATA } from '@angular/material/dialog'
import { User } from 'src/app/classes/user'

@Component({
  selector: 'app-full-name-dialog',
  templateUrl: './full-name-dialog.component.html',
  styleUrls: ['./full-name-dialog.component.scss']
})
export class FullNameDialogComponent implements OnInit {

  public readonly fullNameForm = this.formBuilder.group({
    firstname: new FormControl(this.user.firstname, [ Validators.required ]),
    surname:   new FormControl(this.user.surname,   [ Validators.required ]),
  })

  public constructor(
    private readonly formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) private readonly user: User) { }

  public ngOnInit(): void { }

  public getValue(): User { return { ...this.user, ...this.fullNameForm.value }}
}
