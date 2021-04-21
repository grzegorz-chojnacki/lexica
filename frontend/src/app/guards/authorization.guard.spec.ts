import { HttpClientModule } from '@angular/common/http'
import { TestBed } from '@angular/core/testing'
import { Router } from '@angular/router'
import { RouterTestingModule } from '@angular/router/testing'
import { UserService } from '../services/user.service'

import { AuthorizedGuard } from './authorization.guard'

const fakeUserService = () => ({
  logged: false,
  login() { this.logged = true },
  logout() { this.logged = false }
})

describe('AuthorizedGuard', () => {
  let guard: AuthorizedGuard

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        RouterTestingModule
      ],
      providers: [{ provide: UserService, useValue: fakeUserService() }]
    })
    guard = TestBed.inject(AuthorizedGuard)
  })

  it('should be created', () => {
    expect(guard).toBeTruthy()
  })

  it('should activate only when user is logged', () => {
    const service = TestBed.inject(UserService)
    expect(guard.canActivate()).toBeFalse()

    service.login('', '')
    expect(guard.canActivate()).toBeTrue()

    service.logout()
    expect(guard.canActivate()).toBeFalse()
  })

  it('should redirect when user is not authorized', () => {
    const service = TestBed.inject(UserService)
    const router = TestBed.inject(Router)
    spyOn(router, 'navigate')

    service.logout()
    guard.canActivate()

    expect(router.navigate).toHaveBeenCalledWith(['/'])
  })

  it('should not redirect when user is authorized', () => {
    const service = TestBed.inject(UserService)
    const router = TestBed.inject(Router)
    spyOn(router, 'navigate')

    service.login('', '')
    guard.canActivate()

    expect(router.navigate).not.toHaveBeenCalled()
  })
})
