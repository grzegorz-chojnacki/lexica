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
  public readonly choiceTest = this.formBuilder.group({
    question: new FormControl(this.card.question, [ Validators.required ]),
    answer:   new FormControl(this.card.answer,   [ Validators.required ]),
    decoys:   new FormArray(this.card.decoys.map(d => new FormControl(d)))
  })

  get decoys(): FormArray {
    return this.choiceTest.get('decoys') as FormArray
  }
  public constructor(
    private readonly formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) private readonly card: ChoiceTest) { }

  public ngOnInit(): void { }

  public createNewAnswer(): void {
    this.decoys.push(this.formBuilder.control(''))
  }
  public deleteDecoy(decoyIndex: number): void {
    this.decoys.removeAt(decoyIndex)
  }
}
