import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormControl } from '@angular/forms'
import { MatDialog } from '@angular/material/dialog'

@Component({
  selector: 'app-task-adding',
  templateUrl: './simple-card-adding.component.html',
  styleUrls: ['./simple-card-adding.component.scss']
})
export class SimpleCardAddingComponent implements OnInit {
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
  }

}
