import { Component, OnInit, Inject } from '@angular/core'
import { MAT_DIALOG_DATA } from '@angular/material/dialog'
import { TaskMenuComponent } from '../task-menu/task-menu.component'
export interface DialogData {
  taskName: string
}
@Component({
  selector: 'app-task-editing',
  templateUrl: './task-editing.component.html',
  styleUrls: ['./task-editing.component.scss']
})
export class TaskEditingComponent implements OnInit {
  public readonly taskName: string
public constructor(@Inject(MAT_DIALOG_DATA) data: DialogData ) { this.taskName = data.taskName}

  ngOnInit(): void {
  }

}
