import { Component, OnInit } from '@angular/core'
import { Location } from '@angular/common'
import { User } from 'src/app/classes/user'
import { UserService } from 'src/app/services/user.service'
import { MatDialog } from '@angular/material/dialog'
import { FullNameDialogComponent } from '../full-name-dialog/full-name-dialog.component'

@Component({
  selector: 'app-account-view',
  templateUrl: './account-view.component.html',
  styleUrls: ['./account-view.component.scss']
})
export class AccountViewComponent implements OnInit {
  public user!: User

  public constructor(
    public readonly location: Location,
    private readonly userService: UserService,
    private readonly dialog: MatDialog) { }

  public ngOnInit(): void {
    this.userService.user.subscribe(u => this.user = u)
  }

  public changeFirstname(): void { }
  public changeSurname(): void { }
  public changeEmail(): void { }
  public changePassword(): void { }

  public deleteAccount(): void { }
}
