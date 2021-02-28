import { Component, OnInit } from '@angular/core'
import { Location } from '@angular/common'
import { User } from 'src/app/classes/user'
import { UserService } from 'src/app/services/user.service'
import { MatDialog } from '@angular/material/dialog'
import { FullNameDialogComponent } from '../full-name-dialog/full-name-dialog.component'
import { UsernameDialogComponent } from '../username-dialog/username-dialog.component'
import { ComponentType } from '@angular/cdk/portal'
import { PasswordDialogComponent } from '../password-dialog/password-dialog.component'
import { ColorDialogComponent } from '../color-dialog/color-dialog.component'
import { Router } from '@angular/router'

@Component({
  selector: 'app-account-view',
  templateUrl: './account-view.component.html',
  styleUrls: ['./account-view.component.scss']
})
export class AccountViewComponent implements OnInit {
  public user!: User

  public constructor(
    public  readonly location: Location,
    private readonly router: Router,
    private readonly userService: UserService,
    private readonly dialog: MatDialog) { }

  public ngOnInit(): void { this.userService.user.subscribe(u => this.user = u) }

  public changeFullName = () => this.openDialogAndUpdateUser(FullNameDialogComponent)
  public changeUsername = () => this.openDialogAndUpdateUser(UsernameDialogComponent)
  public changePassword = () => this.openDialogAndUpdateUser(PasswordDialogComponent)
  public changeColor    = () => this.openDialogAndUpdateUser(ColorDialogComponent)

  public removeAccount(): void {
    this.userService.removeAccount()
    this.router.navigate([''])
  }

  private openDialogAndUpdateUser<T>(component: ComponentType<T>): void {
    this.dialog.open(component, { data: this.user, width: '400px' })
      .afterClosed()
      .subscribe(user => user ? this.userService.updateUser(user) : null)
  }
}
