import { Component, ComponentFactoryResolver, Injector, OnInit, ViewChild } from '@angular/core'
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
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { arrayNotEmpty, saveAsFile } from 'src/app/classes/utils'

const taskTypeEditorMap = new Map<TaskType, any>([
  [SimpleCardTask, SimpleCardEditorComponent],
  [ChoiceTestTask, ChoiceTestEditorComponent],
  [MultiTestTask,  MultiTestEditorComponent]
])

@Component({
  selector: 'app-task-editor-dispatch',
  templateUrl: './task-editor-dispatch.component.html',
  styleUrls: ['./task-editor-dispatch.component.scss']
})
export class TaskEditorDispatchComponent implements OnInit {
  public readonly taskTypes = [SimpleCardTask, ChoiceTestTask, MultiTestTask]

  private teamId?: string
  private taskId?: string

  public readonly taskForm = this.formBuilder.group({
    name:        new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.maxLength(50)]),
    examples:    new FormControl([], [arrayNotEmpty]),
    type:        new FormControl(this.taskTypes[0])
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
        this.taskForm.controls.type.disable()
      }, _ => this.navigateToTeam())
    } else {
      this.taskForm.controls.type.valueChanges
        .subscribe(type => this.resolveNewTaskTemplate(type))
      this.taskForm.controls.type.updateValueAndValidity()
    }
  }

  public submit(saveTask: boolean): void {
    if (saveTask && this.teamId) {
      const task = this.taskForm.value
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
      this.taskForm.patchValue(task)
      const editor = this.createEditor(component)
      editor.onSubmit.subscribe((save: boolean) => this.submit(save))
    }
  }

  private resolveNewTaskTemplate(type: TaskType): void {
    this.taskForm.patchValue({ type, examples: [] }, { emitEvent: false })
    const component = taskTypeEditorMap.get(type)
    const editor = this.createEditor(component)
    editor.onSubmit.subscribe((save: boolean) => this.submit(save))
  }

  private createEditor(component: any): TaskEditorComponent {
    const injector = Injector.create({
      providers: [{ provide: FormGroup, useValue: this.taskForm }]
    })

    const viewContainerRef = this.taskHost.viewContainerRef
    viewContainerRef.clear()
    const componentFactory = this.cfr.resolveComponentFactory<TaskEditorComponent>(component)
    const editor = viewContainerRef
      .createComponent<TaskEditorComponent>(componentFactory, 0, injector)
    return editor.instance
  }

  public import(event: any): void {
    const file = event.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.addEventListener('load', event => {
        try {
          const content = event.target?.result as string
          const [examples, type] = Example.parse(content)
          const task = { ...this.taskForm.value, examples, type } as Task<Example>

          if (!this.taskTypeIsValid(type)) {
            throw new Error('Task type mismatch with existing task')
          }

          this.resolveTaskTemplate(task)
          this.taskForm.patchValue({ examples })
        } catch (e) {
          this.snackbarService.open('Niepoprawny format przykładów')
        }
      })
      reader.readAsText(file)
    }
  }

  private taskTypeIsValid(type: TaskType): boolean {
    const typeControl = this.taskForm.get('type')
    return (typeControl?.enabled) || typeControl?.value === type
  }

  public export = () => saveAsFile(this.taskForm.value)

  public navigateToTeam = () => this.router.navigate([`/team/${this.teamId}`])
}
