import { Component, OnInit } from '@angular/core'
import { MatDialog } from '@angular/material/dialog'
import { Router } from '@angular/router'
import { Location } from '@angular/common'
import { SimpleCardDialogComponent } from '../simple-card-dialog/simple-card-dialog.component'
import { SimpleCard } from 'src/app/classes/example'
import { TaskEditorComponent } from '../task-editor'
import { FormGroup } from '@angular/forms'

@Component({
  selector: 'app-simple-card-editor',
  templateUrl: './simple-card-editor.component.html',
  styleUrls: ['./simple-card-editor.component.scss']
})
export class SimpleCardEditorComponent extends TaskEditorComponent implements OnInit {

  public constructor(
    private readonly dialog: MatDialog,
    public  readonly taskForm: FormGroup,
    public  readonly router: Router,
    public  readonly location: Location
  ) { super() }

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
