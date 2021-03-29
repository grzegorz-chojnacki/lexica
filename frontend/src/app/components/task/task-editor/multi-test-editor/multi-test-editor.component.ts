import { Component, OnInit } from '@angular/core'
import { MatDialog } from '@angular/material/dialog'
import { Router } from '@angular/router'
import { Location } from '@angular/common'
import { MultiTest } from 'src/app/classes/example'
import { MultiTestDialogComponent } from '../multi-test-dialog/multi-test-dialog.component'
import { TaskEditorComponent } from '../task-editor'
import { FormGroup } from '@angular/forms'


@Component({
  selector: 'app-multi-test-editor',
  templateUrl: './multi-test-editor.component.html',
  styleUrls: ['./multi-test-editor.component.scss']
})
export class MultiTestEditorComponent extends TaskEditorComponent implements OnInit {
  protected readonly dialogComponent = MultiTestDialogComponent

  public constructor(
    public readonly taskForm: FormGroup,
    public readonly router: Router,
    public readonly location: Location,
    dialog: MatDialog,
  ) { super(dialog) }

  protected patchExample(example: MultiTest, result: MultiTest): void {
    example.question = result.question
    example.answers = result.answers
    example.decoys = result.decoys
  }

  protected emptyExample(): MultiTest { return new MultiTest('', [], []) }

  public ngOnInit(): void { }
}
