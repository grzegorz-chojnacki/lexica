import { Component, EventEmitter, OnInit, Output } from '@angular/core'
import { MatDialog } from '@angular/material/dialog'
import { FormBuilder, FormControl, Validators } from '@angular/forms'
import { Router } from '@angular/router'
import { Location } from '@angular/common'
import { SimpleCardDialogComponent } from '../simple-card-dialog/simple-card-dialog.component'
import { SimpleCard } from 'src/app/classes/example'
import { arrayNotEmpty } from 'src/app/classes/utils'
import { SimpleCardTask } from 'src/app/classes/task-type'

@Component({
  selector: 'app-simple-card-editor',
  templateUrl: './simple-card-editor.component.html',
  styleUrls: ['./simple-card-editor.component.scss']
})
export class SimpleCardEditorComponent implements OnInit {
  @Output() public onSubmit = new EventEmitter()
  public taskForm = this.formBuilder.group({
    name:        new FormControl('', [ Validators.required ]),
    description: new FormControl('', [ Validators.maxLength(50) ]),
    examples:    new FormControl([], [ arrayNotEmpty ]),
    type:        SimpleCardTask
  })

  public constructor(
    private readonly dialog: MatDialog,
    private readonly formBuilder: FormBuilder,
    public  readonly router: Router,
    public  readonly location: Location) { }

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

  public submit(): void { this.onSubmit.emit(this.taskForm.value) }
  public cancel(): void { this.onSubmit.emit(null) }
}