import { Component, OnInit } from '@angular/core'
import { PreviousRouteService } from 'src/app/services/previous-route.service'

@Component({
  selector: 'app-local',
  templateUrl: './local-workspace.component.html',
  styleUrls: ['./local-workspace.component.scss']
})
export class LocalWorkspaceComponent implements OnInit {

  public constructor(private previousRouteService: PreviousRouteService) { }

  public ngOnInit(): void {
  }

}
