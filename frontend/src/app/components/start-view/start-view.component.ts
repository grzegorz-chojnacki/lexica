import { Component, OnInit } from '@angular/core'
import { BreadCrumbService } from 'src/app/services/bread-crumb.service'
import { UserService } from 'src/app/services/user.service'

@Component({
  selector: 'app-start-view',
  templateUrl: './start-view.component.html',
  styleUrls: ['./start-view.component.scss']
})
export class StartViewComponent implements OnInit {

  public constructor(
    private readonly userService: UserService,
    private readonly breadCrumbService: BreadCrumbService) { }

  public ngOnInit(): void {
    this.userService.user.subscribe(_ => {
      this.userService.logged
        ? this.breadCrumbService.setWorkspace()
        : this.breadCrumbService.setMainPage()
    })
  }

  public redirect(): string {
    return this.userService.logged ? '/workspace' : '/login'
  }
}
