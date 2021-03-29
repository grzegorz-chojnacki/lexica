import { Component, OnInit } from '@angular/core'
import { MatDialog } from '@angular/material/dialog'
import { Router } from '@angular/router'
import { Location } from '@angular/common'
import { ChoiceTest } from 'src/app/classes/example'
import { ChoiceTestDialogComponent } from '../choice-test-dialog/choice-test-dialog.component'
import { TaskEditorComponent } from '../task-editor'
import { FormGroup } from '@angular/forms'

@Component({
  selector: 'app-choice-test-editor',
  templateUrl: './choice-test-editor.component.html',
  styleUrls: ['./choice-test-editor.component.scss']
})
export class ChoiceTestEditorComponent extends TaskEditorComponent implements OnInit {
  protected readonly dialogComponent = ChoiceTestDialogComponent

  public constructor(
    public readonly taskForm: FormGroup,
    public readonly router: Router,
    public readonly location: Location,
    dialog: MatDialog,
  ) { super(dialog) }

  protected patchExample(example: ChoiceTest, result: ChoiceTest): void {
    example.question = result.question
    example.answer = result.answer
    example.decoys = result.decoys
  }

  protected emptyExample(): ChoiceTest { return new ChoiceTest('', '', []) }

  public ngOnInit(): void { }
}
