import { Component, OnInit } from '@angular/core'
import { UserService } from 'src/app/services/user.service'

@Component({
  selector: 'app-start-view',
  templateUrl: './start-view.component.html',
  styleUrls: ['./start-view.component.scss']
})
export class StartViewComponent implements OnInit {

  public constructor(private readonly userService: UserService) { }

  public ngOnInit(): void { }

  public redirect(): string {
    return this.userService.logged ? '/workspace' : '/login'
  }
}
