import { TestBed } from '@angular/core/testing'
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'

import { User } from 'src/app/classes/user'
import { UserService } from './user.service'
import { tasks, users } from '../test-data'
import { lexicaURL } from '../lexica.properties'
import { Progress } from '../classes/progress'

describe('UserService', () => {
  let service: UserService
  let httpMock: HttpTestingController

  beforeEach(() => {
    sessionStorage.clear()
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    })
    service = TestBed.inject(UserService)
    httpMock = TestBed.inject(HttpTestingController)
  })

  afterEach(() => { httpMock.verify() })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })

  it('should login user', () => {
    const user = users[0]

    service
      .login(user.username, user.password)
      .subscribe(u => {
        expect(u).toEqual(user)
        expect(service.logged).toBeTrue()
      })

    httpMock.expectOne(`${lexicaURL}/user/login`).flush(user)
  })

  it('should save user after login', () => {
    const user = users[0]

    service
      .login(user.username, user.password)
      .subscribe(u => {
        expect(sessionStorage.getItem('user'))
          .toEqual(JSON.stringify(user))
      })

    httpMock.expectOne(`${lexicaURL}/user/login`).flush(user)
  })

  it('should handle login error', () => {
    const user = users[0]
    const handler = { user: () => { }, err: () => { } }
    spyOn(handler, 'user')
    spyOn(handler, 'err')

    service
      .login(user.username, user.password)
      .subscribe(handler.user, handler.err)

    httpMock.expectOne(`${lexicaURL}/user/login`).error(new ErrorEvent(''))
    expect(handler.user).not.toHaveBeenCalled()
    expect(handler.err).toHaveBeenCalled()
  })

  it('should register user', () => {
    const user = users[0]

    service
      .register(user)
      .subscribe(u => expect(u).toEqual(user))

    httpMock.expectOne(`${lexicaURL}/user/register`).flush(user)
  })

  it('should save user after registration', () => {
    const user = users[0]

    service
      .register(user)
      .subscribe(u => {
        expect(sessionStorage.getItem('user'))
          .toEqual(JSON.stringify(user))
      })

    httpMock.expectOne(`${lexicaURL}/user/register`).flush(user)
  })

  it('should handle register error', () => {
    const user = users[0]
    const handler = { user: () => { }, err: () => { } }
    spyOn(handler, 'user')
    spyOn(handler, 'err')

    service
      .register(user)
      .subscribe(handler.user, handler.err)

    httpMock.expectOne(`${lexicaURL}/user/register`).error(new ErrorEvent(''))
    expect(handler.user).not.toHaveBeenCalled()
    expect(handler.err).toHaveBeenCalled()
  })

  it('should distribute user after login', () => {
    const user = users[0]

    service.user.subscribe(u => {
      if (u !== User.empty) {
        expect(user).toEqual(user)
      }
    })

    service.login(user.username, user.password).subscribe()

    httpMock.expectOne(`${lexicaURL}/user/login`).flush(user)
  })

  it('should remove user account and logout', () => {
    const user = users[0]

    service
      .login(user.username, user.password)
      .subscribe(_ => {
        service.removeAccount()
        expect(service.logged).toBeFalse()
        service.user.subscribe(u => expect(u).toBe(User.empty))
      })

    httpMock.expectOne(`${lexicaURL}/user/login`).flush(user)
    const req = httpMock.expectOne(`${lexicaURL}/user`)
    expect(req.request.method).toBe('DELETE')
  })

  it('should update user', () => {
    const user = users[0]

    service
      .login(user.username, user.password)
      .subscribe(_ => service.updateUser(user))

    httpMock.expectOne(`${lexicaURL}/user/login`).flush(user)
    const req = httpMock.expectOne(`${lexicaURL}/user`)
    expect(req.request.method).toBe('PUT')
  })

  it('should add user progress', () => {
    const user = users[0]

    service
      .login(user.username, user.password)
      .subscribe(_ => {
        service.addProgress(new Progress(tasks[0], 100)).subscribe()
      })

    httpMock.expectOne(`${lexicaURL}/user/login`).flush(user)
    const req = httpMock.expectOne(`${lexicaURL}/user/progress`)
    expect(req.request.method).toBe('PUT')
  })
})
