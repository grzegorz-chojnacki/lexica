import { Component, ComponentFactoryResolver, OnInit, ViewChild } from '@angular/core'
import { Router, ActivatedRoute } from '@angular/router'
import { Directive, ViewContainerRef } from '@angular/core'
import { Example, SimpleCard, Task } from 'src/app/classes/task'
import { Team } from 'src/app/classes/team'
import { UserService } from 'src/app/services/user.service'
import { TaskService } from 'src/app/services/task.service'
import { User } from 'src/app/classes/user'
import { BreadCrumbService } from 'src/app/services/bread-crumb.service'
import { SimpleCardViewComponent } from './simple-card-view/simple-card-view.component';

@Directive({ selector: '[taskHost]' })
export class TaskDirective {
  public constructor(public viewContainerRef: ViewContainerRef) { }
}

@Component({
  selector: 'app-task-view',
  templateUrl: './task-view.component.html',
  styleUrls: ['./task-view.component.scss']
})
export class TaskViewComponent implements OnInit {
  public team!: Team
  public user!: User
  public task!: Task<Example>

  @ViewChild(TaskDirective, { static: true })
  public taskHost!: TaskDirective

  public constructor(
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly breadCrumbService: BreadCrumbService,
    private readonly taskService: TaskService,
    private readonly userService: UserService,
    private readonly cfr: ComponentFactoryResolver
    ) { }

  public ngOnInit(): void {
    this.userService.user.subscribe(user => this.user = user)

    const teamId = this.route.snapshot.paramMap.get('teamId')
    const taskId = this.route.snapshot.paramMap.get('taskId')

    this.taskService
      .getTask(teamId, taskId)
      .subscribe(task => {
        this.task = task as Task<SimpleCard>
        this.resolveTaskTemplate(task)
        this.breadCrumbService.setTeamTask(teamId as string, taskId as string)
      }, _ => this.router.navigate(['/']))
  }

  private resolveTaskTemplate(task: Task<Example>): void {
    const viewContainerRef = this.taskHost.viewContainerRef
    viewContainerRef.clear()

    if (task.type.id === 1) {
      const componentFactory = this.cfr.resolveComponentFactory(SimpleCardViewComponent)
      const componentRef = viewContainerRef.createComponent<SimpleCardViewComponent>(componentFactory)
      componentRef.instance.task = task as Task<SimpleCard>
    } else { console.log('Other') }
  }
}
