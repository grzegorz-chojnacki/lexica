import { Component, Inject, OnInit } from '@angular/core'
import { MAT_DIALOG_DATA } from '@angular/material/dialog'
import { Task, Example, TaskAndUsersWithProgress } from 'src/app/classes/task'
import { Team } from 'src/app/classes/team'
import { Subscription } from 'rxjs'
import { DataService } from 'src/app/services/data.service'



@Component({
  selector: 'app-task-dialog',
  templateUrl: './task-dialog.component.html',
  styleUrls: ['./task-dialog.component.scss']
})
export class TaskDialogComponent implements OnInit {
  public readonly task: Task<Example>
  public readonly team: Team
  public message: string | null = 'foreignWord'
  public subscription!: Subscription

  public constructor(
    @Inject(MAT_DIALOG_DATA) data: TaskAndUsersWithProgress, private dataS: DataService) {
    this.task = data.task
    this.team = data.team
  }

  public ngOnInit(): void {
    this.subscription = this.dataS.currentMessage.subscribe(message => this.message = message)
    this.dataS.changeMessage('foreignWord')
  }

  public isForeignVersion(foreign: boolean): void {
    if (foreign) {
                   this.dataS.changeMessage('foreignWord') }
    else {
           this.dataS.changeMessage('nativeWord')}
  }

}
