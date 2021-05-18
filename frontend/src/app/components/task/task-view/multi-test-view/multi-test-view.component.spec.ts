import { ComponentFixture, TestBed } from '@angular/core/testing'
import { FormsModule } from '@angular/forms'
import { MatCardModule } from '@angular/material/card'
import { MatCheckboxModule } from '@angular/material/checkbox'
import { MatDialog, MatDialogModule } from '@angular/material/dialog'
import { MatDividerModule } from '@angular/material/divider'
import { MatListModule } from '@angular/material/list'
import { NoopAnimationsModule } from '@angular/platform-browser/animations'
import { multiTestTask } from 'src/app/test-data'
import { TaskSummaryComponent } from '../../task-summary/task-summary.component'
import { MultiTestViewComponent } from './multi-test-view.component'

describe('MultiChoiceTestViewComponent', () => {
  let component: MultiTestViewComponent
  let fixture: ComponentFixture<MultiTestViewComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MatDialogModule,
        NoopAnimationsModule,
        MatCheckboxModule,
        MatListModule,
        MatDividerModule,
        FormsModule,
        MatCardModule,
      ],
      declarations: [MultiTestViewComponent, TaskSummaryComponent]
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(MultiTestViewComponent)
    component = fixture.componentInstance
    component.task = multiTestTask
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should build multi test controls', () => {
    component.ngOnInit()

    expect(component.controls.length).toBe(component.task.examples.length)
    expect(component.controls.every(c => component.task.examples.includes(c.example)))
    expect(component.controls.every(c => c.checkboxes.every(ch => ch.value === false)))
  })

  it('should count knew examples and open dialog on sum', () => {
    const dialog = TestBed.inject(MatDialog)
    spyOn(dialog, 'open').and.callThrough()

    const task = component.task
    component.ngOnInit()

    task.examples.forEach(example => {
      const control = component.controls
        .find(control => control.example === example)

      if (control) {
        example.answers.forEach(answer =>
          control.checkboxes.forEach(chechbox => {
            if (answer === chechbox.option) {
              chechbox.value = true
            }
        }))
      }
    })

    component.sum()

    expect(component.knewList.length).toBe(component.task.examples.length)
    expect(dialog.open).toHaveBeenCalled()
  })
})
