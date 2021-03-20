import { Component, OnInit, Inject } from '@angular/core'
import { FormBuilder, FormControl, Validators } from '@angular/forms'
import { MAT_DIALOG_DATA } from '@angular/material/dialog'
import { SimpleCard } from 'src/app/classes/example'

@Component({
  selector: 'app-simple-card-dialog',
  templateUrl: './simple-card-dialog.component.html',
  styleUrls: ['./simple-card-dialog.component.scss']
})
export class SimpleCardDialogComponent implements OnInit {
  public readonly simpleCard = this.formBuilder.group({
    foreignWord: new FormControl(this.card.foreignWord, [ Validators.required ]),
    nativeWord:  new FormControl(this.card.nativeWord,  [ Validators.required ])
  })

  public constructor(
    private readonly formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) private readonly card: SimpleCard) { }

  public ngOnInit(): void { }
}
