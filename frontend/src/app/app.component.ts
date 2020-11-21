import { Component } from '@angular/core'
import { User } from 'src/app/classes/user'
import { UserService } from 'src/app/services/user.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public user!: User

  public constructor(private userService: UserService) {
    this.userService.loggedUser.subscribe(u => this.user = u)
  }
}
