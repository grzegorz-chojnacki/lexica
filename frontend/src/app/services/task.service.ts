import { Injectable } from '@angular/core'
import { BehaviorSubject, Observable } from 'rxjs'
import { map } from 'rxjs/operators'

import { Example, SimpleCard, Task } from 'src/app/classes/task'
import { testTasks } from 'src/app/testData'
import { HttpClient } from '@angular/common/http'
import { lexicaURL } from '../lexica.properties'
import { TaskType } from '../classes/task-type'

export interface TaskForm {
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
  private readonly taskSource = new BehaviorSubject<Task<SimpleCard>[]>(testTasks)
  public constructor(private readonly http: HttpClient) { }


  public getTask(id: string | null): Observable<Task<SimpleCard>> {

    return this.http.get<Task<SimpleCard>>(`${lexicaURL}/task/${id}`)
    .pipe(map(Task.deserialize))
  }

  // ToDo: Send this data to server and fetch new task list
   public createTask(form: TaskForm): void {
     const newTask = new Task('a', form.name, form.examples, form.taskType, true, form.description)
     this.prependTaskSource(newTask)
   }

  private prependTaskSource(task: Task<SimpleCard>): void {
    this.taskSource.next([task, ...this.taskSource.getValue()])
  }

}
