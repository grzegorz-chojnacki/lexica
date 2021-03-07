import { Component, OnInit, Inject } from '@angular/core'
import { FormBuilder, FormControl, Validators, FormArray } from '@angular/forms'
import { MAT_DIALOG_DATA } from '@angular/material/dialog'
import { ChoiceTest } from 'src/app/classes/example'

@Component({
  selector: 'app-choice-test-card-dialog',
  templateUrl: './choice-test-dialog.component.html',
  styleUrls: ['./choice-test-dialog.component.scss']
})
export class ChoiceTestDialogComponent implements OnInit {
  public newAnswer = true
  public readonly simpleCard = this.formBuilder.group({
    foreignWord: new FormControl(this.card.question, [ Validators.required ]),
    nativeWord:  new FormControl(this.card.answer,  [ Validators.required ]),
    decoys: new FormControl(this.card.decoys, [Validators.required ])
  })

  public constructor(
    private readonly formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) private readonly card: ChoiceTest) { }

  public ngOnInit(): void { }

  public createNewAnswer(): void {
    this.newAnswer = true
  }
}
