import { Component, Inject, OnInit } from '@angular/core'
import { FormBuilder, FormControl, Validators } from '@angular/forms'
import { MAT_DIALOG_DATA } from '@angular/material/dialog'
import { User } from 'src/app/classes/user'

@Component({
  selector: 'app-password-dialog',
  templateUrl: './password-dialog.component.html',
  styleUrls: ['./password-dialog.component.scss']
})
export class PasswordDialogComponent implements OnInit {
  public readonly passwordForm = this.formBuilder
    .group({ password: new FormControl('', [ Validators.required ]) })

  public constructor(
    private readonly formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) private readonly user: User) { }

  public ngOnInit(): void { }

  public getValue(): User {
    return { ...this.user, ...this.passwordForm.value }
  }
}
