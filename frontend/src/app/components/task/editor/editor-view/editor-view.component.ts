import { Component, ComponentFactoryResolver, OnInit, ViewChild } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { Example } from 'src/app/classes/example'
import { Task } from 'src/app/classes/task'
import { EmptyTask } from 'src/app/classes/task-type'
import { BreadCrumbService } from 'src/app/services/bread-crumb.service'
import { TaskService } from 'src/app/services/task.service'
import { TaskDirective } from '../../task-view/task-view.component'

@Component({
  selector: 'app-editor-view',
  templateUrl: './editor-view.component.html',
  styleUrls: ['./editor-view.component.scss']
})
export class EditorViewComponent implements OnInit {
  public teamId!: string
  public taskId!: string

  @ViewChild(TaskDirective, { static: true })
  public taskHost!: TaskDirective

  public constructor(
    private readonly breadCrumbService: BreadCrumbService,
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
      this.breadCrumbService.setTeamNewTask(this.teamId)
    }
  }

  public submit(task: Task<Example>): void {
    const request = (this.taskId)
      ? this.taskService.updateTask(this.teamId, this.taskId, task)
      : this.taskService.createTask(this.teamId, task)
    request.subscribe(_ => this.navigateToTeam())
  }

  private resolveTaskTemplate(task: Task<Example>): void {
    if (task.type !== EmptyTask) {
      const viewContainerRef = this.taskHost.viewContainerRef
      viewContainerRef.clear()

      const componentFactory = this.cfr.resolveComponentFactory(task.type.editor)
      const componentRef = viewContainerRef
        .createComponent<typeof task.type.editor>(componentFactory)

      componentRef.instance.taskForm.patchValue(task)
      componentRef.instance.onSubmit.subscribe((t: Task<Example>) => this.submit(t))
    }
  }

  public navigateToTeam = () => this.router.navigate([`/team/${this.teamId}`])
}
