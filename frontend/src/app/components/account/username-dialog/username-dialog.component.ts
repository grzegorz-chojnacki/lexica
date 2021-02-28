import { Component, Inject, OnInit } from '@angular/core'
import { FormBuilder, FormControl, Validators } from '@angular/forms'
import { MAT_DIALOG_DATA } from '@angular/material/dialog'
import { User } from 'src/app/classes/user'

@Component({
  selector: 'app-username-dialog',
  templateUrl: './username-dialog.component.html',
  styleUrls: ['./username-dialog.component.scss']
})
export class UsernameDialogComponent implements OnInit {
  public readonly usernameForm = this.formBuilder.group({
    username: new FormControl(this.user.username, [ Validators.required ])
  })

  public constructor(
    private readonly formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) private readonly user: User) { }

  public ngOnInit(): void { }

  public getValue(): User { return { ...this.user, ...this.usernameForm.value }}
}
