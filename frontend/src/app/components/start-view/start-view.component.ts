import { Component, OnInit } from '@angular/core'
import { BreadCrumbService } from 'src/app/services/bread-crumb.service'

@Component({
  selector: 'app-start-view',
  templateUrl: './start-view.component.html',
  styleUrls: ['./start-view.component.scss']
})
export class StartViewComponent implements OnInit {

  public constructor(private readonly breadCrumbService: BreadCrumbService) { }

  public ngOnInit(): void { this.breadCrumbService.setMainPage() }
}
