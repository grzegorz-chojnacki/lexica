import { Component, ComponentFactoryResolver, OnInit, ViewChild } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { Example } from 'src/app/classes/example'
import { Task } from 'src/app/classes/task'
import { ChoiceTestTask, MultiTestTask, NullTask, SimpleCardTask, TaskType } from 'src/app/classes/task-type'
import { TaskService } from 'src/app/services/task.service'
import { TaskDirective } from '../../task-view/task-view-dispatch/task-view-dispatch.component'
import { SimpleCardEditorComponent } from '../simple-card-editor/simple-card-editor.component'
import { ChoiceTestEditorComponent } from '../choice-test-editor/choice-test-editor.component'
import { MultiTestEditorComponent } from '../multi-test-editor/multi-test-editor.component'
import { snackBarDuration } from 'src/app/lexica.properties'
import { MatSnackBar } from '@angular/material/snack-bar'
import { TaskEditorComponent } from '../task-editor'
import { FormBuilder, FormControl, Validators } from '@angular/forms'

const taskTypeEditorMap = new Map<TaskType, any>([
  [SimpleCardTask, SimpleCardEditorComponent],
  [ChoiceTestTask, ChoiceTestEditorComponent],
  [MultiTestTask, MultiTestEditorComponent]
])

@Component({
  selector: 'app-task-editor-dispatch',
  templateUrl: './task-editor-dispatch.component.html',
  styleUrls: ['./task-editor-dispatch.component.scss']
})
export class TaskEditorDispatchComponent implements OnInit {
  public readonly taskTypes = [SimpleCardTask, ChoiceTestTask, MultiTestTask]

  public teamId!: string
  public taskId!: string
  private editor!: TaskEditorComponent

  public readonly taskHeaderForm = this.formBuilder.group({
    name: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.maxLength(50)]),
    type: new FormControl(this.taskTypes[0])
  })

  @ViewChild(TaskDirective, { static: true })
  public taskHost!: TaskDirective

  public constructor(
    private readonly snackbarService: MatSnackBar,
    private readonly formBuilder: FormBuilder,
    private readonly taskService: TaskService,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly cfr: ComponentFactoryResolver,
  ) { }

  public ngOnInit(): void {
    this.teamId = this.route.snapshot.paramMap.get('teamId') as string
    this.taskId = this.route.snapshot.paramMap.get('taskId') as string

    if (this.taskId) {
      this.taskService.getTask(this.teamId, this.taskId).subscribe(task => {
        this.resolveTaskTemplate(task)
        this.taskHeaderForm.controls.type.disable()
      }, _ => this.navigateToTeam())
    } else {
      this.taskHeaderForm.controls.type.valueChanges
        .subscribe(type => this.resolveNewTaskTemplate(type))
      this.taskHeaderForm.controls.type.updateValueAndValidity()
    }
  }

  public submit(partialTask: { type: TaskType, examples: Example[] }): void {
    if (partialTask) {
      const task = { ...this.taskHeaderForm.value, ...partialTask }
      const request = (this.taskId)
        ? this.taskService.updateTask(this.teamId, this.taskId, task)
        : this.taskService.createTask(this.teamId, task)

      request.subscribe(_ => {
        this.navigateToTeam()
        this.snackbarService
          .open('Zapisano zadanie!', undefined, { duration: snackBarDuration })
      })
    } else { this.navigateToTeam() }
  }

  private resolveTaskTemplate(task: Task<Example>): void {
    if (task.type !== NullTask) {
      const component = taskTypeEditorMap.get(task.type)
      this.taskHeaderForm.patchValue(task)
      this.setEditor(component)
      this.editor.taskForm.patchValue(task)
      this.editor.onSubmit.subscribe((t: Task<Example>) => this.submit(t))
    }
  }

  private resolveNewTaskTemplate(type: TaskType): void {
    const component = taskTypeEditorMap.get(type)
    this.setEditor(component)
    this.editor.onSubmit.subscribe((t: Task<Example>) => this.submit(t))
  }

  private setEditor(component: any): void {
    const viewContainerRef = this.taskHost.viewContainerRef
    viewContainerRef.clear()
    const componentFactory = this.cfr.resolveComponentFactory<TaskEditorComponent>(component)
    this.editor = viewContainerRef
      .createComponent<TaskEditorComponent>(componentFactory)
      .instance
  }

  public import(event: any): void {
    const file = event.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.addEventListener('load', event => {
        try {
          const content = event.target?.result as string
          const [examples, type] = Example.parse(content)
          const task = { ...this.taskHeaderForm.value, examples, type } as Task<Example>

          if (!this.taskTypeIsValid(type)) {
            throw new Error('Task type mismatch with existing task')
          }

          this.resolveTaskTemplate(task)
          this.editor.taskForm.patchValue({ examples })
        } catch (e) {
          this.snackbarService.open('Niepoprawny format przykładów')
        }
      })
      reader.readAsText(file)
    }
  }

  private taskTypeIsValid(type: TaskType): boolean {
    const typeControl = this.taskHeaderForm.get('type')
    return (typeControl?.enabled) || typeControl?.value === type
  }

  public navigateToTeam = () => this.router.navigate([`/team/${this.teamId}`])
}
