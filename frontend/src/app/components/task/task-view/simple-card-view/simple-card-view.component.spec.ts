import { ComponentFixture, TestBed } from '@angular/core/testing'
import { MatCardModule } from '@angular/material/card'
import { MatDialog, MatDialogModule } from '@angular/material/dialog'
import { NoopAnimationsModule } from '@angular/platform-browser/animations'
import { simpleCardTask } from 'src/app/test-data'
import { TaskSummaryComponent } from '../../task-summary/task-summary.component'
import { SimpleCardViewComponent } from './simple-card-view.component'

describe('SimpleCardViewComponent', () => {
  let component: SimpleCardViewComponent
  let fixture: ComponentFixture<SimpleCardViewComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MatDialogModule,
        NoopAnimationsModule,
        MatCardModule
      ],
      declarations: [SimpleCardViewComponent, TaskSummaryComponent],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(SimpleCardViewComponent)
    component = fixture.componentInstance
    component.task = simpleCardTask
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should set next card and not add previous to known', () => {
    component.nextCard(false)

    expect(component.counter).toBe(1)
    expect(component.knewList.length).toBe(0)
  })

  it('should set next card and add previous to known', () => {
    component.nextCard(true)

    expect(component.counter).toBe(1)
    expect(component.knewList.length).toBe(1)
    expect(component.knewList).toContain(component.task.examples[0])
  })

  it('should open dialog on after last card', () => {
    const dialog = TestBed.inject(MatDialog)
    spyOn(dialog, 'open').and.callThrough()
    const examples = component.task.examples

    examples.forEach(example => component.nextCard(true))

    expect(JSON.stringify(component.knewList)).toBe(JSON.stringify(examples))
    expect(dialog.open).toHaveBeenCalledTimes(1)
  })
})
