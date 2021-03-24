import { Component, OnInit } from '@angular/core'
import { MatDialog } from '@angular/material/dialog'
import { FormBuilder, FormControl } from '@angular/forms'
import { Router } from '@angular/router'
import { Location } from '@angular/common'
import { MultiTest } from 'src/app/classes/example'
import { arrayNotEmpty } from 'src/app/classes/utils'
import { MultiTestTask } from 'src/app/classes/task-type'
import { MultiTestDialogComponent } from '../multi-test-dialog/multi-test-dialog.component'
import { TaskEditorComponent } from '../task-editor'


@Component({
  selector: 'app-multi-test-editor',
  templateUrl: './multi-test-editor.component.html',
  styleUrls: ['./multi-test-editor.component.scss']
})
export class MultiTestEditorComponent extends TaskEditorComponent implements OnInit {
  public taskForm = this.formBuilder.group({
    examples:    new FormControl([], [ arrayNotEmpty ]),
    type:        MultiTestTask
  })
  constructor(private readonly dialog: MatDialog,
    private readonly formBuilder: FormBuilder,
    public  readonly router: Router,
    public  readonly location: Location) { super() }

  ngOnInit(): void { }

  public deleteCard(card: MultiTest): void {
    this.taskForm.patchValue({
      examples: this.taskForm.value.examples.filter((m: MultiTest) => m !== card)
    })
    this.taskForm.controls.examples.updateValueAndValidity()
  }

  public editCard(card: MultiTest): void {
    this.dialog
      .open(MultiTestDialogComponent,
        { data: card, hasBackdrop: false})
      .afterClosed()
      .subscribe(result => {
        if (result) {
          card.question  = result.question
          card.answers = result.answers
          card.decoys = result.decoys
        }
      })
  }

  public addCard(): void {
    this.dialog
      .open(MultiTestDialogComponent,
        { width: '500px',
        data: new MultiTest('', [], []), hasBackdrop: false})
      .afterClosed()
      .subscribe(result => {
        if (result) {
          this.taskForm.value.examples.push(result)
          this.taskForm.controls.examples.updateValueAndValidity()
        }
      })
  }

}
