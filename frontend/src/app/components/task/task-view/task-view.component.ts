import { Component, OnInit } from '@angular/core'
import { Router, ActivatedRoute } from '@angular/router'


import { Example, SimpleCard, Task } from 'src/app/classes/task'
import { Team } from 'src/app/classes/team'
import { UserService } from 'src/app/services/user.service'
import { TaskService } from 'src/app/services/task.service'
import { User } from 'src/app/classes/user'
import { TaskSummaryComponent } from '../task-summary/task-summary.component'
import { MatDialog } from '@angular/material/dialog'

@Component({
  selector: 'app-task-view',
  templateUrl: './task-view.component.html',
  styleUrls: ['./task-view.component.scss']
})
export class TaskViewComponent implements OnInit {
  public team!: Team
  public user!: User
  public task!: Task<SimpleCard>

  public counter = 0
  public readonly knewList = new Array<Example>()

  public constructor(
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly taskService: TaskService,
    private readonly userService: UserService,
    private readonly dialog: MatDialog) { }

  public ngOnInit(): void {
    this.userService.user.subscribe(user => this.user = user)

    const taskId = this.route.snapshot.paramMap.get('taskId')

    this.taskService
      .getTask(taskId)
      .subscribe(task => this.task = task, _ => this.router.navigate(['/']))
  }

  public nextCard(knew: boolean): void {
    if (knew) { this.knewList.push(this.task.examples[this.counter]) }

    if (this.counter < this.task.examples.length - 1) {
      this.counter++
    } else {
      this.dialog.open(TaskSummaryComponent, {
        data: {
          knewList: this.knewList,
          task: this.task
        },
        width: '500px'
      })
    }
  }
}
