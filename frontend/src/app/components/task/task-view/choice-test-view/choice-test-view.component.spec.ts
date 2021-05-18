import { CommonModule } from '@angular/common'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { FormsModule } from '@angular/forms'
import { MatCardModule } from '@angular/material/card'
import { MatDialog, MatDialogModule } from '@angular/material/dialog'
import { MatDividerModule } from '@angular/material/divider'
import { MatListModule } from '@angular/material/list'
import { MatRadioModule } from '@angular/material/radio'
import { NoopAnimationsModule } from '@angular/platform-browser/animations'
import { choiceTestTask } from 'src/app/test-data'
import { TaskSummaryComponent } from '../../task-summary/task-summary.component'
import { ChoiceTestViewComponent } from './choice-test-view.component'

describe('ChoiceTestViewComponent', () => {
  let component: ChoiceTestViewComponent
  let fixture: ComponentFixture<ChoiceTestViewComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MatDialogModule,
        CommonModule,
        NoopAnimationsModule,
        MatCardModule,
        MatDividerModule,
        MatRadioModule,
        MatListModule,
        FormsModule
      ],
      declarations: [ ChoiceTestViewComponent, TaskSummaryComponent ]
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(ChoiceTestViewComponent)
    component = fixture.componentInstance
    component.task = choiceTestTask
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should accumulate knew examples and open dialog', () => {
    const dialog = TestBed.inject(MatDialog)
    spyOn(dialog, 'open').and.callThrough()

    component.correctAnswer = [choiceTestTask.examples[0].answer]
    component.sum()

    expect(component.knewList.length).toBe(1)
    expect(dialog.open).toHaveBeenCalled()
  })
})
