import { Component, OnInit, Inject } from '@angular/core'
import { FormBuilder, FormControl } from '@angular/forms'
import { MAT_DIALOG_DATA } from '@angular/material/dialog'

export interface DialogData {
  foreign: string
  native: string
}

@Component({
  selector: 'app-task-adding',
  templateUrl: './simple-card-adding.component.html',
  styleUrls: ['./simple-card-adding.component.scss']
})
export class SimpleCardAddingComponent implements OnInit {
  public readonly simpleCard = this.formBuilder.group({
    foreign: this.data.foreign,
    native: this.data.native,
    image: new FormControl({ value: '', disabled: true })
  })

  public constructor(
    private readonly formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) private readonly data: DialogData) { }

  public ngOnInit(): void { }
}
