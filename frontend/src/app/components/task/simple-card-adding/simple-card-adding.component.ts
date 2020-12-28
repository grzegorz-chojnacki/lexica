import { Component, OnInit, Inject } from '@angular/core'
import { FormBuilder, FormControl } from '@angular/forms'
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog'
import { SimpleCardsAddingComponent } from 'src/app/components/task/simple-cards-adding/simple-cards-adding.component'
import { SimpleCard } from 'src/app/classes/task'
export interface DialogData {
  obce: string
  narodowe: string
}

@Component({
  selector: 'app-task-adding',
  templateUrl: './simple-card-adding.component.html',
  styleUrls: ['./simple-card-adding.component.scss']
})
export class SimpleCardAddingComponent implements OnInit {
  public readonly taskForm = this.formBuilder.group({
    image: new FormControl({ value: '', disabled: true })
  })

  public constructor(
  private readonly formBuilder: FormBuilder,
  private readonly dialog: MatDialog,
  @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  public ngOnInit(): void {
   }


}
