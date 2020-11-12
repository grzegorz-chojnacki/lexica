import { Component } from '@angular/core'
import { User } from 'src/app/classes/user'
import { UserService } from 'src/app/services/user.service'
import { PreviousRouteService } from 'src/app/services/previous-route.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public user!: User

  public constructor(
    private userService: UserService,
    private previousRouteService: PreviousRouteService) {

    this.userService.loggedUser.subscribe(u => this.user = u)
  }
}
