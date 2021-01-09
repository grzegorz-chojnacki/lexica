import { Component, OnInit } from '@angular/core'
import { User } from 'src/app/classes/user'
import { UserService } from 'src/app/services/user.service'
import { BreadCrumbService, BreadCrumb } from './services/bread-crumb.service'

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
    private readonly breadCrumbService: BreadCrumbService) { }

  public ngOnInit(): void {
    this.userService.user.subscribe(u => this.user = u)
    this.breadCrumbService.breadCrumbs.subscribe(next => this.breadCrumbs = next)
  }
}
