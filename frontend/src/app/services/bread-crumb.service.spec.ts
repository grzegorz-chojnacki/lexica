import { HttpClientModule } from '@angular/common/http'
import { TestBed } from '@angular/core/testing'
import { RouterTestingModule } from '@angular/router/testing'
import { BreadCrumbService } from './bread-crumb.service'

describe('BreadCrumbService', () => {
  let service: BreadCrumbService

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, RouterTestingModule]
    })
    service = TestBed.inject(BreadCrumbService)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })
})
