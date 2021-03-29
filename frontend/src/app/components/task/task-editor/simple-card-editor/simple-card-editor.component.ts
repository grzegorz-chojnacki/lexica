import { Component, OnInit } from '@angular/core'
import { MatDialog } from '@angular/material/dialog'
import { Router } from '@angular/router'
import { Location } from '@angular/common'
import { SimpleCardDialogComponent } from '../simple-card-dialog/simple-card-dialog.component'
import { Example, SimpleCard } from 'src/app/classes/example'
import { TaskEditorComponent } from '../task-editor'
import { FormGroup } from '@angular/forms'

@Component({
  selector: 'app-simple-card-editor',
  templateUrl: './simple-card-editor.component.html',
  styleUrls: ['./simple-card-editor.component.scss']
})
export class SimpleCardEditorComponent extends TaskEditorComponent implements OnInit {
  protected readonly dialogComponent = SimpleCardDialogComponent

  public constructor(
    public readonly taskForm: FormGroup,
    public readonly router: Router,
    public readonly location: Location,
    dialog: MatDialog,
  ) { super(dialog) }

  protected patchExample(example: SimpleCard, result: SimpleCard): void {
    example.nativeWord = result.nativeWord
    example.foreignWord = result.foreignWord
  }

  protected emptyExample(): Example { return new SimpleCard('', '') }

  public ngOnInit(): void { }
}
