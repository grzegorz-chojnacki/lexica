import { ComponentFixture, TestBed } from '@angular/core/testing'
import { MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog'
import { team } from 'src/app/test-data'
import { TaskDetailsComponent } from './task-details.component'

describe('TaskDetailsComponent', () => {
  let component: TaskDetailsComponent
  let fixture: ComponentFixture<TaskDetailsComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatDialogModule],
      declarations: [TaskDetailsComponent],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: { team, task: team.tasks[0] } }
      ]
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskDetailsComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
