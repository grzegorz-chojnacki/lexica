import { Component, OnInit } from '@angular/core'

@Component({
  selector: 'app-workspace',
  templateUrl: './workspace.component.html',
  styleUrls: ['./workspace.component.scss']
})
export class WorkspaceComponent implements OnInit {
  // ToDo: change to ...: Team[] = `...getTeams...`
  public teams: any[] = Array(4).fill('Zespół')
  public search: string = ''

  public constructor() { }

  public ngOnInit(): void { }

  public createTeam(): void { }

}
