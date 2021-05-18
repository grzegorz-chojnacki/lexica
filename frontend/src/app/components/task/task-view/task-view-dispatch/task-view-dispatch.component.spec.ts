import { ComponentFixture, TestBed } from '@angular/core/testing'
import { MatCardModule } from '@angular/material/card'
import { MatDialogModule } from '@angular/material/dialog'
import { MatSnackBarModule } from '@angular/material/snack-bar'
import { RouterTestingModule } from '@angular/router/testing'
import { of } from 'rxjs'
import { Progress } from 'src/app/classes/progress'
import { TaskService } from 'src/app/services/task.service'
import { UserService } from 'src/app/services/user.service'
import { simpleCardTask, tasks } from 'src/app/test-data'
import { TaskViewDispatchComponent } from './task-view-dispatch.component'

describe('TaskViewDispatchComponent', () => {
  let component: TaskViewDispatchComponent
  let fixture: ComponentFixture<TaskViewDispatchComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MatDialogModule,
        RouterTestingModule,
        MatSnackBarModule,
        MatCardModule
      ],
      declarations: [TaskViewDispatchComponent],
      providers: [
        { provide: TaskService, useValue: { getTask() { return of() }}},
        { provide: UserService, useValue: { addProgress() { return of() } } },
      ]
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskViewDispatchComponent)
    component = fixture.componentInstance
    component.task = simpleCardTask
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should not add null progress', () => {
    spyOn(component, 'reloadFn')
    const userService = TestBed.inject(UserService)
    spyOn(userService, 'addProgress').and.callThrough()

    component.addProgress(null as any as Progress)

    expect(userService.addProgress).not.toHaveBeenCalled()
    expect(component.reloadFn).toHaveBeenCalled()
  })

  it('should add new progress', () => {
    const userService = TestBed.inject(UserService)
    spyOn(userService, 'addProgress').and.callThrough()

    component.addProgress(new Progress(tasks[0], 100))

    expect(userService.addProgress).toHaveBeenCalled()
  })
})
