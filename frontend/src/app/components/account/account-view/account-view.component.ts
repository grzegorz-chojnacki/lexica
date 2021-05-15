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
import { ConfirmationDialogComponent } from 'src/app/components/confirmation-dialog/confirmation-dialog.component'
import { snackBarDuration } from 'src/app/lexica.properties'
import { MatSnackBar } from '@angular/material/snack-bar'


@Component({
  selector: 'app-account-view',
  templateUrl: './account-view.component.html',
  styleUrls: ['./account-view.component.scss']
})
export class AccountViewComponent implements OnInit {
  public user!: User

  public constructor(
    public  readonly location: Location,
    private readonly snackbarService: MatSnackBar,
    private readonly router: Router,
    private readonly userService: UserService,
    private readonly dialog: MatDialog) { }

  public ngOnInit(): void { this.userService.user.subscribe(u => this.user = u) }

  public changeFullName = () => this.openDialogAndUpdateUser(FullNameDialogComponent)
  public changeUsername = () => this.openDialogAndUpdateUser(UsernameDialogComponent, true)
  public changePassword = () => this.openDialogAndUpdateUser(PasswordDialogComponent, true)
  public changeColor = () => this.openDialogAndUpdateUser(ColorDialogComponent)

  public removeAccount(): void {
    this.userService.removeAccount()
    this.router.navigate([''])
    this.snackbarService
      .open('Usunięto konto!', undefined, { duration: snackBarDuration })
  }

  private openDialogAndUpdateUser<T>(component: ComponentType<T>, logout = false): void {
    this.dialog.open(component, { data: this.user, width: '400px' })
      .afterClosed()
      .subscribe(user => {
        if (user) {
          this.userService.updateUser(user)
          if (logout) {
            this.userService.logout()
            this.router.navigate([''])
          }
          this.snackbarService
            .open('Zapisano zmiany!', undefined, { duration: snackBarDuration })
        }
      })
  }

  public openDialog(): void {
    this.dialog.open(ConfirmationDialogComponent, {
      data: {
        message: 'Czy na pewno usunąć swoje konto?',
        buttonText: { ok: 'Usuń', cancel: 'Nie' }
      }
    })
      .afterClosed()
      .subscribe(confirmed => confirmed ? this.removeAccount() : null)
  }
}
