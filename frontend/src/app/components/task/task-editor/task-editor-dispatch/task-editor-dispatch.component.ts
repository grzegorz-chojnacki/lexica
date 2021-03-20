import { Component, ComponentFactoryResolver, ComponentRef, OnInit, ViewChild } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { Example } from 'src/app/classes/example'
import { Task } from 'src/app/classes/task'
import { ChoiceTestTask, NullTask, SimpleCardTask, TaskType } from 'src/app/classes/task-type'
import { BreadCrumbService } from 'src/app/services/bread-crumb.service'
import { TaskService } from 'src/app/services/task.service'
import { TaskDirective } from '../../task-view/task-view-dispatch/task-view-dispatch.component'
import { SimpleCardEditorComponent } from '../simple-card-editor/simple-card-editor.component'
import { ChoiceTestEditorComponent } from '../choice-test-editor/choice-test-editor.component'
import { snackBarDuration } from 'src/app/lexica.properties'
import { MatSnackBar } from '@angular/material/snack-bar'
import { TaskEditorComponent } from '../task-editor'
import { FormBuilder, FormControl, Validators } from '@angular/forms'

const taskTypeEditorMap = new Map<TaskType, any>([
  [ SimpleCardTask, SimpleCardEditorComponent ],
  [ ChoiceTestTask, ChoiceTestEditorComponent ]
])

const newTaskEditorMap = new Map<string, any>([
  [ 'simplecard', SimpleCardEditorComponent ],
  [ 'choicetest', ChoiceTestEditorComponent ]
])

@Component({
  selector: 'app-task-editor-dispatch',
  templateUrl: './task-editor-dispatch.component.html',
  styleUrls: ['./task-editor-dispatch.component.scss']
})
export class TaskEditorDispatchComponent implements OnInit {
  public teamId!: string
  public taskId!: string

  public readonly taskForm = this.formBuilder.group({
    name:        new FormControl('', [ Validators.required ]),
    description: new FormControl('', [ Validators.maxLength(50) ])
  })

  @ViewChild(TaskDirective, { static: true })
  public taskHost!: TaskDirective

  public constructor(
    private readonly breadCrumbService: BreadCrumbService,
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
        this.breadCrumbService.setTeamTaskEditor(this.teamId, this.taskId)
        this.resolveTaskTemplate(task)
      }, _ => this.navigateToTeam())
    } else {
      const type = this.route.snapshot.queryParams.type as string
      this.resolveNewTaskTemplate(type)
      this.breadCrumbService.setTeamNewTask(this.teamId)
    }
  }

  public submit(task: Task<Example>): void {
    if (task) {
      task = {...this.taskForm.value, ...task }
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
      const editor = this.setEditor(component).instance
      this.taskForm.patchValue(task)
      editor.taskForm.patchValue(task)
      editor.onSubmit.subscribe((t: Task<Example>) => this.submit(t))
    }
  }

  private resolveNewTaskTemplate(type: string): void {
    const component = newTaskEditorMap.get(type)
    const editor = this.setEditor(component).instance
    editor.onSubmit.subscribe((t: Task<Example>) => this.submit(t))
  }

  private setEditor(editor: any): ComponentRef<TaskEditorComponent> {
    const viewContainerRef = this.taskHost.viewContainerRef
    viewContainerRef.clear()
    const componentFactory = this.cfr.resolveComponentFactory<TaskEditorComponent>(editor)
    return viewContainerRef.createComponent<TaskEditorComponent>(componentFactory)
  }

  public navigateToTeam = () => this.router.navigate([`/team/${this.teamId}`])
}
