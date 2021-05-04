import { HttpClientModule } from '@angular/common/http'
import { TestBed } from '@angular/core/testing'
import { Router } from '@angular/router'
import { RouterTestingModule } from '@angular/router/testing'
import { StartViewComponent } from '../components/start-view/start-view.component'
import { WorkspaceComponent } from '../components/workspace/workspace.component'
import { UserService } from '../services/user.service'
import { fakeUserService } from '../test-data'

import { AuthorizedGuard, UnauthorizedGuard } from './authorization.guard'

const routerTestingModule = RouterTestingModule.withRoutes([
  { path: '', component: StartViewComponent },
  { path: 'workspace', component: WorkspaceComponent }
])

describe('AuthorizedGuard', () => {
  let guard: AuthorizedGuard
  let router: Router

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        routerTestingModule
      ],
      providers: [{ provide: UserService, useValue: fakeUserService() }]
    })
    guard = TestBed.inject(AuthorizedGuard)
    router = TestBed.inject(Router)
  })

  it('should be created', () => {
    expect(guard).toBeTruthy()
  })

  it('should activate only when user is logged', () => {
    const service = TestBed.inject(UserService)
    service.login('', '')
    expect(guard.canActivate()).toBeTrue()

    service.logout()
    expect(guard.canActivate()).toBeFalse()
  })

  it('should redirect when user is not authorized', () => {
    const service = TestBed.inject(UserService)
    spyOn(router, 'navigate').and.callThrough()

    service.logout()
    guard.canActivate()

    expect(router.navigate).toHaveBeenCalledWith(['/'])
  })

  it('should not redirect when user is authorized', () => {
    const service = TestBed.inject(UserService)
    spyOn(router, 'navigate').and.callThrough()

    service.login('', '')
    guard.canActivate()

    expect(router.navigate).not.toHaveBeenCalled()
  })
})

describe('UnauthorizedGuard', () => {
  let guard: UnauthorizedGuard
  let router: Router

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        routerTestingModule
      ],
      providers: [{ provide: UserService, useValue: fakeUserService() }]
    })
    guard = TestBed.inject(UnauthorizedGuard)
    router = TestBed.inject(Router)
  })

  it('should be created', () => {
    expect(guard).toBeTruthy()
  })

  it('should activate only when user is not logged', () => {
    const service = TestBed.inject(UserService)

    service.login('', '')
    expect(guard.canActivate()).toBeFalse()

    service.logout()
    expect(guard.canActivate()).toBeTrue()
  })

  it('should redirect when user is authorized', () => {
    const service = TestBed.inject(UserService)
    spyOn(router, 'navigate').and.callThrough()

    service.login('', '')
    guard.canActivate()

    expect(router.navigate).toHaveBeenCalledWith(['/workspace'])
  })

  it('should not redirect when user is unathorized', () => {
    const service = TestBed.inject(UserService)
    spyOn(router, 'navigate').and.callThrough()

    service.logout()
    guard.canActivate()

    expect(router.navigate).not.toHaveBeenCalled()
  })
})