import { Injectable } from '@angular/core'
import { BehaviorSubject, Observable } from 'rxjs'
import { map } from 'rxjs/operators'

import { SimpleCard, Task } from 'src/app/classes/task'
import { HttpClient } from '@angular/common/http'
import { lexicaURL } from '../lexica.properties'
import { TaskType, SimpleCardTask } from '../classes/task-type'
import { Team } from '../classes/team'

export interface TaskForm {
  readonly team: Team,
  readonly name: string
  readonly description?: string
  readonly examples: SimpleCard[]
  readonly image?: string
  readonly taskType: TaskType
}

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  public  readonly emptyTask = new Task('', '', [], SimpleCardTask)
  private taskSource = new BehaviorSubject<Task<SimpleCard>>(this.emptyTask)
  public constructor(private readonly http: HttpClient) { }

  public getTask(id: string | null): Observable<Task<SimpleCard>> {
    if (id) { this.refreshTaskSource(id) }
    return this.taskSource.asObservable()
  }

  private refreshTaskSource(id: string): void {
    this.http.get<Task<SimpleCard>>(`${lexicaURL}/task/${id}`)
      .pipe(map(Task.deserialize))
      .subscribe(
        task => this.taskSource.next(task),
        err => {
          this.taskSource.error(err) // Reset taskSource after error
          this.taskSource = new BehaviorSubject<Task<SimpleCard>>(this.emptyTask)
        })
  }

  public createTask(form: TaskForm): void {
    this.http.post(`${lexicaURL}/team/${form.team.id}/task`, form).subscribe()
  }

  public updateTask(form: TaskForm, id: string): void {
    this.http.put(`${lexicaURL}/team/${form.team.id}/task/${id}`, form)
      .subscribe()
  }
}
