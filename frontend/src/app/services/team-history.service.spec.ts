import { HttpClientModule } from '@angular/common/http'
import { TestBed } from '@angular/core/testing'

import { TeamHistoryService } from './team-history.service'

describe('TeamHistoryService', () => {
  let service: TeamHistoryService

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule]
    })
    service = TestBed.inject(TeamHistoryService)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })
})
