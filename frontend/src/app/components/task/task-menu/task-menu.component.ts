import { Component, Input, OnInit, ViewChild } from '@angular/core'
import { MatDialog } from '@angular/material/dialog'
import { MatMenu } from '@angular/material/menu'
import { Task, Example } from 'src/app/classes/task'
import { User } from 'src/app/classes/user'
import { TaskDetailsComponent } from 'src/app/components/task/task-details/task-details.component'

@Component({
  selector: 'app-task-menu',
  templateUrl: './task-menu.component.html',
  styleUrls: ['./task-menu.component.scss']
})
export class TaskMenuComponent implements OnInit {
  @Input() public task!: Task<Example>
  @Input() public users!: User[]
  @ViewChild(MatMenu, { static: true }) public readonly menu!: MatMenu

  public constructor(private readonly dialog: MatDialog) { }

  public ngOnInit(): void { }

  public taskDescription(): void {
    this.dialog.closeAll()
    this.dialog.open(TaskDetailsComponent, {
      width: '700px',
      data: {
        task: this.task,
        users: this.users
      }
    })
  }
}
