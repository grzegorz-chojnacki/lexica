import { Injectable } from '@angular/core'
import { BehaviorSubject, Observable } from 'rxjs'
import { map } from 'rxjs/operators'

import { SimpleCard, Task } from 'src/app/classes/task'
import { testTasks } from 'src/app/testData'
import { HttpClient } from '@angular/common/http'
import { lexicaURL } from '../lexica.properties'

export interface TaskForm {
  readonly name: string
  readonly description?: string
  readonly image?: string
}

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private readonly taskSource = new BehaviorSubject<Task<SimpleCard>[]>(testTasks)
  public constructor(private readonly http: HttpClient) { }


  public getTask(id: string | null): Observable<Task<SimpleCard>> {

    return this.http.get<Task<SimpleCard>>(`${lexicaURL}/task/${id}`)
    .pipe(map(Task.deserialize))
  }

  // ToDo: Send this data to server and fetch new task list
  // public createTask(form: TaskForm): void {
  //   const newTask = new Task(form.name, [])

  //   this.prependTaskSource(newTask)
  // }

  private prependTaskSource(task: Task<SimpleCard>): void {
    this.taskSource.next([task, ...this.taskSource.getValue()])
  }

}
