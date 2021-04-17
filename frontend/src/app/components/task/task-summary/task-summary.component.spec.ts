import { ComponentFixture, TestBed } from '@angular/core/testing'
import { MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog'
import { MatDividerModule } from '@angular/material/divider'
import { MatListModule } from '@angular/material/list'
import { simpleCardTask } from 'src/app/test-data'
import { TaskSummaryComponent } from './task-summary.component'

describe('TaskSummaryComponent', () => {
  let component: TaskSummaryComponent
  let fixture: ComponentFixture<TaskSummaryComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MatDividerModule,
        MatListModule,
        MatDialogModule
      ],
      declarations: [TaskSummaryComponent],
      providers: [
        {
          provide: MAT_DIALOG_DATA,
          useValue: { knewList: [], task: simpleCardTask }
        }]
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskSummaryComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
