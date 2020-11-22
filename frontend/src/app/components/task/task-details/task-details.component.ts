import { Component, OnInit } from '@angular/core'
import { Team } from 'src/app/classes/team'
import { UserService } from 'src/app/services/user.service'
import { User } from 'src/app/classes/user'
@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.scss']
})
export class TaskDetailsComponent implements OnInit {
  public team!: Team
  public user!: User
public constructor(
  private userService: UserService) { }



  public ngOnInit(): void {
    this.userService.loggedUser.subscribe(user => this.user = user)

  }

}
