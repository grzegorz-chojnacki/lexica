import { Component, Input, OnInit } from '@angular/core'

@Component({
  selector: 'app-team-container',
  templateUrl: './team-container.component.html',
  styleUrls: ['./team-container.component.scss']
})
export class TeamContainerComponent implements OnInit {
  @Input() title: String = ''
  @Input() teams: any[] = []

  public constructor() { }

  public ngOnInit(): void { }

}
