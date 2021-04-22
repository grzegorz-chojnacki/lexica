import { Component } from '@angular/core'
import { TestBed } from '@angular/core/testing'
import { Router, Routes } from '@angular/router'
import { RouterTestingModule } from '@angular/router/testing'
import { BehaviorSubject } from 'rxjs'
import { User } from '../classes/user'
import { users } from '../test-data'
import { BreadCrumbService, breadCrumbTemplates } from './bread-crumb.service'
import { UserService } from './user.service'

const fakeUserService = () => ({
  user: new BehaviorSubject(User.empty),
  logged: false,
  login() {
    this.logged = true
    this.user.next(users[0])
  },
  logout() {
    this.logged = false
    this.user.next(User.empty)
  }
})

@Component({ selector: 'app-blank', template: '' })
export class BlankComponent { }

const bct = breadCrumbTemplates
const routes: Routes = Object.values(bct)
  .map(fn => fn(':teamId', ':taskId').route.slice(1))
  .map(route => ({ path: route, component: BlankComponent }))

describe('BreadCrumbService', () => {
  let service: BreadCrumbService
  let userService: UserService
  let router: Router

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes(routes)],
      providers: [{ provide: UserService, useValue: fakeUserService() }]
    })
    service = TestBed.inject(BreadCrumbService)
    userService = TestBed.inject(UserService)
    router = TestBed.inject(Router)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })

  it('should initialize with only mainPage for logged out user', () => {
    service.breadCrumbs.subscribe(bcs => {
      expect(bcs.length).toBe(1)
      expect(bcs[0]).toEqual(bct.mainPage())
    })
  })

  it('should initialize with workspace for logged user', () => {
    userService.login('', '')

    service.breadCrumbs.subscribe(bcs => {
      expect(bcs.length).toBe(2)
      expect(bcs[1]).toEqual(bct.workspace())
    })
  })

  it('should initialize with workspace for logged user', () => {
    userService.login('', '')

    service.breadCrumbs.subscribe(bcs => {
      expect(bcs.length).toBe(2)
      expect(bcs[1]).toEqual(bct.workspace())
    })
  })

  it('should react to router navigation events', async () => {
    const handler = { bcs: () => {} }
    spyOn(handler, 'bcs').and.callThrough()

    service.breadCrumbs.subscribe(handler.bcs)

    await router.navigate(['workspace']).then(() => {
      expect(handler.bcs).toHaveBeenCalledTimes(2) // Subscription + navigation
    })
  })

  it('should parse advanced routes', async () => {
    userService.login('', '')

    const advancedRoutes = [
      '/team/1',
      '/team/1/task/1',
      '/team/1/task/new',
      '/team/1/task/1/edit',
    ]

    for (const route of advancedRoutes) {
      await router.navigateByUrl(route).then(() => {
        service.breadCrumbs.subscribe(bcs => {
          expect(bcs[bcs.length - 1].route).toEqual(route)
        }).unsubscribe()
      })
    }
  })
})
