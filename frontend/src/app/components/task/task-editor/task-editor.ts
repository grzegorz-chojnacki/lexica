import { ComponentType } from '@angular/cdk/portal'
import { Component, EventEmitter, Output } from '@angular/core'
import { FormGroup } from '@angular/forms'
import { MatDialog } from '@angular/material/dialog'
import { Example } from 'src/app/classes/example'

@Component({ template: '' })
export abstract class TaskEditorComponent {
  @Output() public readonly onSubmit = new EventEmitter()
  public readonly taskForm!: FormGroup
  protected readonly dialogComponent!: ComponentType<any>

  public constructor(private readonly dialog: MatDialog) { }

  protected abstract patchExample(example: Example, result: Example): void
  protected abstract emptyExample(): Example

  public editCard(example: Example): void {
    this.dialog
      .open(this.dialogComponent, { data: example })
      .afterClosed()
      .subscribe(result => {
        if (result) { this.patchExample(example, result) }
      })
  }

  public addCard(): void {
    this.dialog
      .open(this.dialogComponent,
        { width: '500px', data: this.emptyExample() })
      .afterClosed()
      .subscribe(result => {
        if (result) {
          this.taskForm.value.examples.push(result)
          this.taskForm.controls.examples.updateValueAndValidity()
        }
      })
  }

  public deleteCard(example: Example): void {
    this.taskForm.patchValue({
      examples: this.taskForm.value.examples.filter((e: Example) => e !== example)
    })
    this.taskForm.controls.examples.updateValueAndValidity()
  }

  public submit(): void { this.onSubmit.emit(true) }
  public cancel(): void { this.onSubmit.emit(false) }
}
