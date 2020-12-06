import { Injectable } from '@angular/core'
import { BehaviorSubject, Observable } from 'rxjs'

import { Team } from 'src/app/classes/team'
import { User } from 'src/app/classes/user'
import { testTeams } from 'src/app/testData'
import { UserService } from './user.service'
import { SimpleCard, Task } from 'src/app/classes/task'
import { testTasks } from 'src/app/testData'

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



  public get tasks(): Observable<Task<SimpleCard>[]> {
    return this.taskSource.asObservable()
  }


  public getTask(hash: string | null): Promise<Task<SimpleCard>> {
    return new Promise((resolve, reject) => {
      const foundTask = this.taskSource.getValue()
        .find(task => task.hash === hash)

      return (foundTask) ? resolve(foundTask) : reject('Task not found')
    })
  }

  // ToDo: Send this data to server and fetch new task list
  public createTask(form: TaskForm): void {
    const newTask = new Task(
      btoa(Math.random().toString()), // Base64 encode
      form.name,
      [])

    this.prependTaskSource(newTask)
  }


  private prependTaskSource(task: Task<SimpleCard>): void {
    this.taskSource.next([task, ...this.taskSource.getValue()])
  }


}
