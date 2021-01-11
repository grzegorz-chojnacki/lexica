import { Component, OnInit } from '@angular/core'
import { Location } from '@angular/common'
import { User } from 'src/app/classes/user'
import { UserService } from 'src/app/services/user.service'
import { MatDialog } from '@angular/material/dialog'
import { FullNameDialogComponent } from '../full-name-dialog/full-name-dialog.component'
import { EmailDialogComponent } from '../email-dialog/email-dialog.component'
import { ComponentType } from '@angular/cdk/portal'
import { PasswordDialogComponent } from '../password-dialog/password-dialog.component'

@Component({
  selector: 'app-account-view',
  templateUrl: './account-view.component.html',
  styleUrls: ['./account-view.component.scss']
})
export class AccountViewComponent implements OnInit {
  public user!: User

  public constructor(
    public  readonly location: Location,
    private readonly userService: UserService,
    private readonly dialog: MatDialog) { }

  public ngOnInit(): void { this.userService.user.subscribe(u => this.user = u) }

  public changeFullName = () => this.openDialogAndUpdateUser(FullNameDialogComponent)
  public changeEmail    = () => this.openDialogAndUpdateUser(EmailDialogComponent)
  public changePassword = () => this.openDialogAndUpdateUser(PasswordDialogComponent)

  public deleteAccount(): void { }

  private openDialogAndUpdateUser<T>(component: ComponentType<T>): void {
    this.dialog.open(component, { data: this.user, width: '400px' })
      .afterClosed()
      .subscribe(user => this.userService.setUser(user))
  }
}
