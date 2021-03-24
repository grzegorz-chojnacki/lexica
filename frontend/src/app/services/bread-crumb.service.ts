import { Injectable } from '@angular/core'
import { NavigationEnd, Router } from '@angular/router'
import { BehaviorSubject, Observable } from 'rxjs'
import { UserService } from './user.service'

export interface BreadCrumb {
  readonly label: string
  readonly route: string
}

@Injectable({
  providedIn: 'root'
})
export class BreadCrumbService {
  private default = [this.mainPage()]
  private breadCrumbSource = new BehaviorSubject<BreadCrumb[]>(this.default)

  public get breadCrumbs(): Observable<BreadCrumb[]> {
    return this.breadCrumbSource.asObservable()
  }

  public constructor(
    private readonly userService: UserService,
    private readonly router: Router) {
    this.userService.user.subscribe(_ => {
      this.default = (this.userService.logged)
        ? [this.mainPage(), this.workspace()]
        : [this.mainPage()]
    })

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.parseRoute(event.url.split('/').splice(1))
      }
    })
  }

  private parseRoute([route, ...rest]: string[]): void {
    const breadCrumbs = route === 'team'
      ? [...this.default, ...this.parseTeamRoute(rest)]
      : [...this.default]

    this.breadCrumbSource.next(breadCrumbs)
  }

  private parseTeamRoute([teamId, route, ...rest]: string[]): BreadCrumb[] {
    return (route === 'task')
      ? [this.teamView(teamId), this.parseTaskRoute(teamId, rest)]
      : [this.teamView(teamId)]
  }

  private parseTaskRoute(teamId: string, [taskId, route]: string[]): BreadCrumb {
    switch (route) {
      case 'new':
        return this.taskNew(teamId)
      case 'edit':
        return this.taskEditor(teamId, taskId)
      default:
        return this.taskView(teamId, taskId)
    }
  }

  private mainPage(): BreadCrumb  { return { label: 'Lexica',  route: '/' }}
  private workspace(): BreadCrumb { return { label: 'Zespoły', route: '/workspace' }}

  private teamView(teamId: string): BreadCrumb {
    return { label: 'Zespół', route: `/team/${teamId}` }
  }

  private taskNew(teamId: string): BreadCrumb {
    return { label: 'Nowe zadanie', route: `/team/${teamId}/task/new`}
  }

  private taskEditor(teamId: string, taskId: string): BreadCrumb {
    return { label: 'Edytor', route: `/team/${teamId}/task/${taskId}/edit`}
  }

  private taskView(teamId: string, taskId: string): BreadCrumb {
    return { label: 'Zadanie', route: `/team/${teamId}/task/${taskId}`}
  }
}
