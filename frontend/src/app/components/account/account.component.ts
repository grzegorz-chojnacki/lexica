import { Component, OnInit } from '@angular/core'
import { Location } from '@angular/common'
import { User } from 'src/app/classes/user'
import { UserService } from 'src/app/services/user.service'

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {
  public user!: User

  public constructor(
    private readonly userService: UserService,
    public readonly location: Location) { }

  public ngOnInit(): void {
    this.userService.user.subscribe(u => this.user = u)
  }

  public deleteAccount(): void { }
}
