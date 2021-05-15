import { TestBed } from '@angular/core/testing'
import { DataService } from './data.service'

describe('DataService', () => {
  let service: DataService

  beforeEach(() => {
    sessionStorage.clear()
    TestBed.configureTestingModule({ })
    service = TestBed.inject(DataService)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })

  it('should initialize with default message', () => {
    service.currentMessage
      .subscribe(m => expect(m).toBe(service.defaultMessage))
  })

  it('should change message', () => {
    let afterChange = false
    const message = 'new'

    service.currentMessage.subscribe(m => {
      if (afterChange) {
        expect(m).toBe(message)
        expect(sessionStorage.getItem('mes')).toBe(message)
      }
      afterChange = true
    })

    service.changeMessage(message)
  })

  it('should initialize with sessionStorage message', () => {
    const message = 'old'
    sessionStorage.setItem('mes', message)

    service = new DataService()

    service.currentMessage.subscribe(m => expect(m).toBe(message))
  })
})
