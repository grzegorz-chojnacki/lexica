import { Component, OnInit } from '@angular/core'
import { MatDialog } from '@angular/material/dialog'
import { FormBuilder, FormControl } from '@angular/forms'
import { Router } from '@angular/router'
import { Location } from '@angular/common'
import { ChoiceTest } from 'src/app/classes/example'
import { arrayNotEmpty } from 'src/app/classes/utils'
import { ChoiceTestTask } from 'src/app/classes/task-type'
import { ChoiceTestDialogComponent } from '../choice-test-dialog/choice-test-dialog.component'
import { TaskEditorComponent } from '../task-editor'

@Component({
  selector: 'app-choice-test-editor',
  templateUrl: './choice-test-editor.component.html',
  styleUrls: ['./choice-test-editor.component.scss']
})
export class ChoiceTestEditorComponent extends TaskEditorComponent implements OnInit {
  public taskForm = this.formBuilder.group({
    examples:    new FormControl([], [ arrayNotEmpty ]),
    type:        ChoiceTestTask
  })

  public constructor(
    private readonly dialog: MatDialog,
    private readonly formBuilder: FormBuilder,
    public  readonly router: Router,
    public  readonly location: Location) { super() }

  public ngOnInit(): void { }

  public deleteCard(card: ChoiceTest): void {
    this.taskForm.patchValue({
      examples: this.taskForm.value.examples.filter((c: ChoiceTest) => c !== card)
    })
    this.taskForm.controls.examples.updateValueAndValidity()
  }

  public editCard(card: ChoiceTest): void {
    this.dialog
      .open(ChoiceTestDialogComponent,
        { data: card, hasBackdrop: false})
      .afterClosed()
      .subscribe(result => {
        if (result) {
          card.question  = result.question
          card.answer = result.answer
          card.decoys = result.decoys
        }
      })
  }

  public addCard(): void {
    this.dialog
      .open(ChoiceTestDialogComponent,
        { width: '500px',
        data: new ChoiceTest('', '', []), hasBackdrop: false})
      .afterClosed()
      .subscribe(result => {
        if (result) {
          this.taskForm.value.examples.push(result)
          this.taskForm.controls.examples.updateValueAndValidity()
        }
      })
  }
}
