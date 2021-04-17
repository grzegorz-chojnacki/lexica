import { ComponentFixture, TestBed } from '@angular/core/testing'
import { MatDialogModule } from '@angular/material/dialog'
import { MatDividerModule } from '@angular/material/divider'
import { MatIconModule } from '@angular/material/icon'
import { MatListModule } from '@angular/material/list'
import { team, users } from 'src/app/test-data'
import { TaskListComponent } from './task-list.component'

describe('TaskListComponent', () => {
  let component: TaskListComponent
  let fixture: ComponentFixture<TaskListComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MatDialogModule,
        MatDividerModule,
        MatListModule,
        MatIconModule
      ],
      declarations: [TaskListComponent]
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskListComponent)
    component = fixture.componentInstance
    component.team = team
    component.user = users[0]
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
