import { ComponentFixture, TestBed } from '@angular/core/testing'
import { MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog'
import { MatIconModule } from '@angular/material/icon'
import { MatInputModule } from '@angular/material/input'
import { MatRadioModule } from '@angular/material/radio'
import { team } from 'src/app/test-data'
import { TaskDialogComponent } from './task-dialog.component'


describe('TaskDialogComponent', () => {
  let component: TaskDialogComponent
  let fixture: ComponentFixture<TaskDialogComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MatDialogModule,
        MatRadioModule,
        MatInputModule,
        MatIconModule
      ],
      declarations: [ TaskDialogComponent ],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: { team, task: team.tasks[0]}}
      ]
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskDialogComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
