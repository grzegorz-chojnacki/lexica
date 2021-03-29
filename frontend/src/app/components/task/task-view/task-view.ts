import { Component, EventEmitter, Output } from '@angular/core'
import { Example } from 'src/app/classes/example'
import { Task } from 'src/app/classes/task'

@Component({ template: '' })
export abstract class TaskViewComponent {
  @Output() public readonly onSubmit = new EventEmitter()
  public task!: Task<Example>
}
