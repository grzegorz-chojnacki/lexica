import { Component, ComponentFactoryResolver, OnInit, ViewChild } from '@angular/core'
import { Router, ActivatedRoute } from '@angular/router'
import { Directive, ViewContainerRef } from '@angular/core'
import { Task } from 'src/app/classes/task'
import { Team } from 'src/app/classes/team'
import { UserService } from 'src/app/services/user.service'
import { TaskService } from 'src/app/services/task.service'
import { ChoiceTestTask, NullTask, SimpleCardTask, TaskType, MultiTestTask } from 'src/app/classes/task-type'
import { Example } from 'src/app/classes/example'
import { SimpleCardViewComponent } from '../simple-card-view/simple-card-view.component'
import { ChoiceTestViewComponent } from '../choice-test-view/choice-test-view.component'
import { MultiTestViewComponent } from '../multi-test-view/multi-test-view.component'
import { Progress } from 'src/app/classes/progress'
import { Location } from '@angular/common'
import { MatSnackBar } from '@angular/material/snack-bar'
import { snackBarDuration } from 'src/app/lexica.properties'
import { TaskViewComponent } from '../task-view'

@Directive({ selector: '[taskHost]' })
export class TaskDirective {
  public constructor(public viewContainerRef: ViewContainerRef) { }
}

const taskTypeViewMap = new Map<TaskType, any>([
  [ SimpleCardTask, SimpleCardViewComponent ],
  [ ChoiceTestTask, ChoiceTestViewComponent ],
  [ MultiTestTask, MultiTestViewComponent ]
])

@Component({
  selector: 'app-task-view-dispatch',
  templateUrl: './task-view-dispatch.component.html',
  styleUrls: ['./task-view-dispatch.component.scss']
})
export class TaskViewDispatchComponent implements OnInit {
  public team!: Team
  public task!: Task<Example>

  @ViewChild(TaskDirective, { static: true })
  public taskHost!: TaskDirective

  public constructor(
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly snackbarService: MatSnackBar,
    private readonly taskService: TaskService,
    private readonly userService: UserService,
    private readonly location: Location,
    private readonly cfr: ComponentFactoryResolver
  ) { }

  public ngOnInit(): void {
    const teamId = this.route.snapshot.paramMap.get('teamId') as string
    const taskId = this.route.snapshot.paramMap.get('taskId') as string

    this.taskService
      .getTask(teamId, taskId)
      .subscribe(task => {
        this.task = task
        this.resolveTaskTemplate(task)
      }, _ => this.router.navigate(['/']))
  }

  private resolveTaskTemplate(task: Task<Example>): void {
    if (task.type !== NullTask) {
      const viewContainerRef = this.taskHost.viewContainerRef
      viewContainerRef.clear()

      const component = taskTypeViewMap.get(task.type)
      const componentFactory = this.cfr.resolveComponentFactory<TaskViewComponent>(component)
      const taskView = viewContainerRef
      .createComponent<TaskViewComponent>(componentFactory)
      .instance

      taskView.task = task
      taskView.onSubmit.subscribe((p: Progress) => this.addProgress(p))
    }
  }

  public addProgress(progress: Progress): void {
    if (progress) {
      this.userService
        .addProgress(progress)
        .subscribe(_ => {
          this.location.back()
          this.snackbarService
            .open('Zapisano wynik!', undefined, { duration: snackBarDuration })
        })
    } else {
      window.location.reload()
    }
  }
}
