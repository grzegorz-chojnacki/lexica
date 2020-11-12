import { Component, OnInit } from '@angular/core'
import { PreviousRouteService } from 'src/app/services/previous-route.service'

@Component({
  selector: 'app-task-adding',
  templateUrl: './task-adding.component.html',
  styleUrls: ['./task-adding.component.scss']
})
export class TaskAddingComponent implements OnInit {

  public constructor(private previousRouteService: PreviousRouteService) { }

  public ngOnInit(): void {
  }

}
