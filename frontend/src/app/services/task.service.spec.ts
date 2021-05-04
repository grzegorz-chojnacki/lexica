import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'
import { TestBed } from '@angular/core/testing'
import { BehaviorSubject, of } from 'rxjs'
import { Example } from '../classes/example'
import { Task } from '../classes/task'
import { User } from '../classes/user'
import { lexicaURL } from '../lexica.properties'
import { tasks, users } from '../test-data'
import { TaskService } from './task.service'
import { UserService } from './user.service'

const fakeUserService = () => ({
  user: new BehaviorSubject(User.empty),
  authHeader() { return {} },
  logged: false,
  login() {
    this.logged = true
    this.user.next(users[0])
    return of()
  },
  logout() {
    this.logged = false
    this.user.next(User.empty)
  }
})

describe('TaskService', () => {
  let service: TaskService
  let userService: UserService
  let httpMock: HttpTestingController

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        { provide: UserService, useValue: fakeUserService() }
      ]
    })
    service = TestBed.inject(TaskService)
    httpMock = TestBed.inject(HttpTestingController)
    userService = TestBed.inject(UserService)
  })

  afterEach(() => { httpMock.verify() })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })

  it('should initialize and not fetch data when user not logged', () => {
    userService.logout()
    service.getTask('1', '2').subscribe(task => expect(task).toBe(service.emptyTask))
    httpMock.expectNone(`${lexicaURL}/team/1/task/2`)
  })

  it('should fetch data when user is logged', () => {
    const task = tasks[0]
    userService.login('', '')

    service
      .getTask('1', '2')
      .subscribe(t => (t !== service.emptyTask) && expect(t).toEqual(task))
    httpMock.expectOne(`${lexicaURL}/team/1/task/2`).flush(task)
  })

  it('should not fetch data when teamId or taskId is empty', () => {
    userService.login('', '')
    const handler = { task: (t: Task<Example>) => {}, err: () => {} }
    spyOn(handler, 'task')
    spyOn(handler, 'err')

    service.getTask(null, null).subscribe(handler.task, handler.err)
    service.getTask(null,  '1').subscribe(handler.task, handler.err)
    service.getTask('2',  null).subscribe(handler.task, handler.err)

    httpMock.expectNone(`${lexicaURL}/team/*/task/*`)
    httpMock.expectNone(`${lexicaURL}/team/*/task/*`)

    // Only initial subscriptions, not after refreshTaskSource()
    expect(handler.task).toHaveBeenCalledTimes(3)
    expect(handler.err).not.toHaveBeenCalled()
  })

  it('should handle task errors', () => {
    userService.login('', '')
    const handler = { task: (t: Task<Example>) => {}, err: () => {} }
    spyOn(handler, 'err')

    service.getTask('0', '0').subscribe(handler.task, handler.err)
    httpMock.expectOne(`${lexicaURL}/team/0/task/0`).error(new ErrorEvent(''))

    expect(handler.err).toHaveBeenCalledTimes(1)
  })

  it('should deserialize fetched task', () => {
    const task = tasks[0]
    userService.login('', '')
    spyOn(Task, 'deserialize').and.callThrough()

    service
      .getTask('1', '2')
      .subscribe(t => (t !== service.emptyTask) && expect(t).toEqual(task))

    httpMock.expectOne(`${lexicaURL}/team/1/task/2`).flush(task)
    expect(Task.deserialize).toHaveBeenCalled()
  })

  it('should make create-task request', () => {
    const task = tasks[0]
    userService.login('', '')

    service.createTask('1', task).subscribe()
    const req = httpMock.expectOne(`${lexicaURL}/team/1/task`).request

    expect(req.method).toBe('POST')
  })

  it('should make update-task request', () => {
    const task = tasks[0]
    userService.login('', '')

    service.updateTask('1', '2', task).subscribe()
    const req = httpMock.expectOne(`${lexicaURL}/team/1/task/2`).request

    expect(req.method).toBe('PUT')
  })

  it('should emit empty task after subsequent requests', () => {
    const taskA = tasks[0]
    const taskB = tasks[1]
    userService.login('', '')

    const subscribe = (task: Task<Example>, cb?: () => void) => {
      let isFirst = true
      const s = service.getTask('1', task.id).subscribe(t => {
        if (isFirst) {
          expect(t).toBe(service.emptyTask)
          isFirst = !isFirst
        } else {
          expect(t).toEqual(task)
          s.unsubscribe()
          cb && cb()
        }
      })
    }

    subscribe(taskA, () => subscribe(taskB))

    httpMock.expectOne(`${lexicaURL}/team/1/task/${taskA.id}`).flush(taskA)
    httpMock.expectOne(`${lexicaURL}/team/1/task/${taskB.id}`).flush(taskB)
  })
})
