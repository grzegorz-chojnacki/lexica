import { HttpClientModule } from '@angular/common/http'
import { TestBed } from '@angular/core/testing'
import { RouterTestingModule } from '@angular/router/testing'

import { AuthorizedGuard } from './authorization.guard'

describe('AuthorizationGuardGuard', () => {
  let guard: AuthorizedGuard

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        RouterTestingModule
      ]
    })
    guard = TestBed.inject(AuthorizedGuard)
  })

  it('should be created', () => {
    expect(guard).toBeTruthy()
  })
})
