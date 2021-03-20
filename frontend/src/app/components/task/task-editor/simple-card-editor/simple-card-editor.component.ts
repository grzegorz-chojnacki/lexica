import { Component, OnInit } from '@angular/core'
import { MatDialog } from '@angular/material/dialog'
import { FormBuilder, FormControl } from '@angular/forms'
import { Router } from '@angular/router'
import { Location } from '@angular/common'
import { SimpleCardDialogComponent } from '../simple-card-dialog/simple-card-dialog.component'
import { SimpleCard } from 'src/app/classes/example'
import { arrayNotEmpty } from 'src/app/classes/utils'
import { SimpleCardTask } from 'src/app/classes/task-type'
import { TaskEditorComponent } from '../task-editor'

@Component({
  selector: 'app-simple-card-editor',
  templateUrl: './simple-card-editor.component.html',
  styleUrls: ['./simple-card-editor.component.scss']
})
export class SimpleCardEditorComponent extends TaskEditorComponent implements OnInit {
  public readonly taskForm = this.formBuilder.group({
    examples:    new FormControl([], [ arrayNotEmpty ]),
    type:        SimpleCardTask
  })

  public constructor(
    private readonly dialog: MatDialog,
    private readonly formBuilder: FormBuilder,
    public  readonly router: Router,
    public  readonly location: Location) { super() }

  public ngOnInit(): void { }

  public deleteCard(card: SimpleCard): void {
    this.taskForm.patchValue({
      examples: this.taskForm.value.examples.filter((c: SimpleCard) => c !== card)
    })
    this.taskForm.controls.examples.updateValueAndValidity()
  }

  public editCard(card: SimpleCard): void {
    this.dialog
      .open(SimpleCardDialogComponent,
        { data: card, hasBackdrop: false})
      .afterClosed()
      .subscribe(result => {
        if (result) {
          card.nativeWord  = result.nativeWord
          card.foreignWord = result.foreignWord
        }
      })
  }

  public addCard(): void {
    this.dialog
      .open(SimpleCardDialogComponent,
        { data: new SimpleCard('', ''), hasBackdrop: false })
      .afterClosed()
      .subscribe(result => {
        if (result) {
          this.taskForm.value.examples.push(result)
          this.taskForm.controls.examples.updateValueAndValidity()
        }
      })
  }
}
