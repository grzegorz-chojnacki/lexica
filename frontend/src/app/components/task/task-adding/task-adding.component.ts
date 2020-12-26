import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormControl } from '@angular/forms'
import { MatDialog } from '@angular/material/dialog'
import { SimpleCardsAddingComponent } from 'src/app/components/task/simple-cards-adding/simple-cards-adding.component'

@Component({
  selector: 'app-task-adding',
  templateUrl: './task-adding.component.html',
  styleUrls: ['./task-adding.component.scss']
})
export class TaskAddingComponent implements OnInit {
  public readonly taskForm = this.formBuilder.group({
    name: '',
    description: '',
    image: new FormControl({ value: '', disabled: true })
  })

  public constructor(
  private readonly formBuilder: FormBuilder,
  private readonly dialog: MatDialog) { }

  public ngOnInit(): void { }

  public submit(): void {
    // this.Example.create(this.taskForm.value as Example
    const dialogRef = this.dialog.open(SimpleCardsAddingComponent, { width: '600px',
    height: '600px'})
  }

}
