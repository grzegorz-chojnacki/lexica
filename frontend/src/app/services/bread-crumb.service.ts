import { Injectable } from '@angular/core'
import { BehaviorSubject, Observable } from 'rxjs'
import { Team } from '../classes/team'

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

  public setTeam(team: Team): void {
    this.breadCrumbSource.next([
      this.default.mainPage,
      this.default.workspace,
      { label: 'Zespół', route: `/team/${team.id}` }
    ])
  }

  public constructor() { }
}
