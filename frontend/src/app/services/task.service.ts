import { Injectable } from '@angular/core'
import { BehaviorSubject, Observable } from 'rxjs'
import { map } from 'rxjs/operators'

import { Task } from 'src/app/classes/task'
import { HttpClient } from '@angular/common/http'
import { lexicaURL } from '../lexica.properties'
import { TaskType, EmptyTask } from '../classes/task-type'
import { Team } from '../classes/team'
import { UserService } from './user.service'
import { Example } from '../classes/example'

export interface TaskForm {
  readonly team: Team
  readonly name: string
  readonly description?: string
  readonly examples: Example[]
  readonly image?: string
  readonly type: TaskType
}

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  public  readonly emptyTask = new Task('', '', [], EmptyTask)
  private taskSource = new BehaviorSubject<Task<Example>>(this.emptyTask)
  public constructor(
    private readonly userService: UserService,
    private readonly http: HttpClient) { }

  public getTask(teamId: string | null, taskId: string | null): Observable<Task<Example>> {
    if (teamId && taskId) { this.refreshTaskSource(teamId, taskId) }
    return this.taskSource.asObservable()
  }

  private refreshTaskSource(teamId: string, taskId: string): void {
    this.http.get<Task<Example>>(
        `${lexicaURL}/team/${teamId}/task/${taskId}`,
        this.userService.authHeader())
      .pipe(map(Task.deserialize))
      .subscribe(
        task => this.taskSource.next(task),
        err => {
          this.taskSource.error(err) // Reset taskSource after error
          this.taskSource = new BehaviorSubject<Task<Example>>(this.emptyTask)
        })
  }

  // Returns subscription that indicates when you can safely redirect to team page
  public createTask(teamId: string, task: Task<Example>): Observable<object> {
    return this.http.post(
      `${lexicaURL}/team/${teamId}/task`,
      task,
      this.userService.authHeader())
  }

  public updateTask(teamId: string, taskId: string, task: Task<Example>): Observable<object> {
    return this.http.put(
      `${lexicaURL}/team/${teamId}/task/${taskId}`,
      task,
      this.userService.authHeader())
  }
}
