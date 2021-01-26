import { Injectable } from '@angular/core'
import { BehaviorSubject, Observable } from 'rxjs'

export interface BreadCrumb {
  readonly label: string
  readonly route: string
}

@Injectable({
  providedIn: 'root'
})
export class BreadCrumbService {
  private readonly default = {
    mainPage:  { label: 'Lexica', route: '/' },
    workspace: { label: 'Zespoły', route: '/workspace' },
  }
  private breadCrumbSource = new BehaviorSubject<BreadCrumb[]>([
    this.default.mainPage
  ])

  public get breadCrumbs(): Observable<BreadCrumb[]> {
    return this.breadCrumbSource.asObservable()
  }

  public setMainPage(): void {
    this.breadCrumbSource.next([ this.default.mainPage ])
  }

  public setWorkspace(): void {
    this.breadCrumbSource.next([ this.default.mainPage, this.default.workspace ])
  }

  public setTeam(teamId: string): void {
    this.breadCrumbSource.next([
      this.default.mainPage,
      this.default.workspace,
      { label: 'Zespół', route: `/team/${teamId}` }
    ])
  }

  public setTeamTask(teamId: string, taskId: string): void {
    this.breadCrumbSource.next([
      this.default.mainPage,
      this.default.workspace,
      { label: 'Zespół',  route: `/team/${teamId}` },
      { label: 'Zadanie', route: `/team/${teamId}/task/${taskId}` }
    ])
  }

  public constructor() { }
}
