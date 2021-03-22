import { Component, OnInit, Inject } from '@angular/core'
import { FormBuilder, FormControl, Validators, FormArray } from '@angular/forms'
import { MAT_DIALOG_DATA } from '@angular/material/dialog'
import { MultiTest } from 'src/app/classes/example'


@Component({
  selector: 'app-multi-test-dialog',
  templateUrl: './multi-test-dialog.component.html',
  styleUrls: ['./multi-test-dialog.component.scss']
})
export class MultiTestDialogComponent implements OnInit {
  public readonly multiTest = this.formBuilder.group({
    question: new FormControl(this.card.question, [ Validators.required ]),
    answers:  new FormArray(this.card.answers.map(a => new FormControl(a))),
    decoys:  new FormArray(this.card.decoys.map(d => new FormControl(d)))
  })

  get decoys(): FormArray {
    return this.multiTest.get('decoys') as FormArray
  }
  get answers(): FormArray {
    return this.multiTest.get('answers') as FormArray
  }
  public constructor(
    private readonly formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) private readonly card: MultiTest) { }


  ngOnInit(): void {
  }
  public createNewDecoy(): void {
    this.decoys.push(this.formBuilder.control(''))
  }
  public deleteDecoy(decoyIndex: number): void {
    this.decoys.removeAt(decoyIndex)
  }
  public createNewAnswer(): void {
    this.answers.push(this.formBuilder.control(''))
  }
  public deleteAnswer(answerIndex: number): void {
    this.answers.removeAt(answerIndex)
  }
}
