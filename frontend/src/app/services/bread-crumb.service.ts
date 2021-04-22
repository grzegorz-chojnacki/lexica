import { Injectable } from '@angular/core'
import { NavigationEnd, Router } from '@angular/router'
import { BehaviorSubject, Observable } from 'rxjs'
import { UserService } from './user.service'

export interface BreadCrumb {
  readonly label: string
  readonly route: string
}

const mainPage = (): BreadCrumb  =>
  ({ label: 'Lexica',  route: '/' })

const workspace = (): BreadCrumb =>
  ({ label: 'Zespoły', route: '/workspace' })

const teamView = (teamId: string): BreadCrumb =>
  ({ label: 'Zespół', route: `/team/${teamId}` })

const taskNew = (teamId: string): BreadCrumb =>
  ({ label: 'Nowe zadanie', route: `/team/${teamId}/task/new` })

const taskEditor = (teamId: string, taskId: string): BreadCrumb =>
  ({ label: 'Edytor', route: `/team/${teamId}/task/${taskId}/edit` })

const taskView = (teamId: string, taskId: string): BreadCrumb =>
  ({ label: 'Zadanie', route: `/team/${teamId}/task/${taskId}` })

export const breadCrumbTemplates = {
  mainPage, workspace, teamView,
  taskNew, taskEditor, taskView,
}

@Injectable({
  providedIn: 'root'
})
export class BreadCrumbService {
  private default = [mainPage()]
  private breadCrumbSource = new BehaviorSubject<BreadCrumb[]>(this.default)

  public get breadCrumbs(): Observable<BreadCrumb[]> {
    return this.breadCrumbSource.asObservable()
  }

  public constructor(
    private readonly userService: UserService,
    private readonly router: Router) {
    this.userService.user.subscribe(_ => {
      this.default = (this.userService.logged)
        ? [mainPage(), workspace()]
        : [mainPage()]

      this.breadCrumbSource.next(this.default)
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
      ? [teamView(teamId), this.parseTaskRoute(teamId, rest)]
      : [teamView(teamId)]
  }

  private parseTaskRoute(teamId: string, [taskId, route]: string[]): BreadCrumb {
    switch (route) {
      case 'new':
        return taskNew(teamId)
      case 'edit':
        return taskEditor(teamId, taskId)
      default:
        return taskView(teamId, taskId)
    }
  }
}
