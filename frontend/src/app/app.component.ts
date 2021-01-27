import { Component, OnInit } from '@angular/core'
import { User } from 'src/app/classes/user'
import { UserService } from 'src/app/services/user.service'
import { BreadCrumbService, BreadCrumb } from './services/bread-crumb.service'
import { Router } from '@angular/router'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public user!: User
  public breadCrumbs: BreadCrumb[] = []

  public constructor(
    private readonly userService: UserService,
    private readonly breadCrumbService: BreadCrumbService,
    public router: Router ) { }

  public ngOnInit(): void {
    this.userService.login('jkowalski@example.com', 'asd')
      // Auto-login for debug
      .subscribe(_ => this.userService.user.subscribe(user => this.user = user))

    this.breadCrumbService.breadCrumbs
      .subscribe(next => setTimeout(() => this.breadCrumbs = next))
  }
}
