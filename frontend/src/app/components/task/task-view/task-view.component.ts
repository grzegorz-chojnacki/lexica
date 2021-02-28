import { Component,  OnInit } from '@angular/core'
import { Router, ActivatedRoute } from '@angular/router'
import { Location } from '@angular/common'

import { Example, SimpleCard, Task } from 'src/app/classes/task'
import { Team } from 'src/app/classes/team'
import { UserService } from 'src/app/services/user.service'
import { TaskService } from 'src/app/services/task.service'
import { User } from 'src/app/classes/user'
import { TaskSummaryComponent } from '../task-summary/task-summary.component'
import { MatDialog } from '@angular/material/dialog'
import { BreadCrumbService } from 'src/app/services/bread-crumb.service'
import { DataService } from 'src/app/services/data.service'
import { Subscription } from 'rxjs'



@Component({
  selector: 'app-task-view',
  templateUrl: './task-view.component.html',
  styleUrls: ['./task-view.component.scss']
})
export class TaskViewComponent implements OnInit {
  public team!: Team
  public user!: User
  public task!: Task<SimpleCard>
  public message!: string | null
  public subscription!: Subscription

  public counter = 0
  public readonly knewList = new Array<Example>()

  public constructor(
    private data: DataService,
    public  readonly location: Location,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly breadCrumbService: BreadCrumbService,
    private readonly taskService: TaskService,
    private readonly userService: UserService,
    private readonly dialog: MatDialog) { }

  public ngOnInit(): void {
    this.subscription = this.data.currentMessage.subscribe(message => this.message = message)


    this.userService.user.subscribe(user => this.user = user)


    const teamId = this.route.snapshot.paramMap.get('teamId')
    const taskId = this.route.snapshot.paramMap.get('taskId')

    this.taskService
      .getTask(teamId, taskId)
      .subscribe(task => {
        this.task = task
        this.breadCrumbService.setTeamTask(teamId as string, taskId as string)
      }, _ => this.router.navigate(['/']))
  }

  public nextCard(knew: boolean): void {
    if (knew) { this.knewList.push(this.task.examples[this.counter]) }

    if (this.counter < this.task.examples.length - 1) {
      this.counter++
    } else {
      this.dialog.open(TaskSummaryComponent, {
        disableClose: true,
        data: {
          knewList: this.knewList,
          task: this.task
        },
        width: '500px'
      }).afterClosed().subscribe(progress => {
          if (progress) {
            this.userService
              .addProgress(progress)
              .subscribe(_ => this.location.back())
          } else {
            window.location.reload()
          }
      })
    }
  }
}
