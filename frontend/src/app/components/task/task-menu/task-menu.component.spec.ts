import { ComponentFixture, TestBed } from '@angular/core/testing'
import { MatDialog, MatDialogModule } from '@angular/material/dialog'
import { MatIconModule } from '@angular/material/icon'
import { MatMenuModule } from '@angular/material/menu'
import { MatSnackBarModule } from '@angular/material/snack-bar'
import { NoopAnimationsModule } from '@angular/platform-browser/animations'
import { TaskMenuComponent } from './task-menu.component'
import { tasks, team } from 'src/app/test-data'
import { TaskService } from 'src/app/services/task.service'
import { TeamService } from 'src/app/services/team.service'
import { of } from 'rxjs'

describe('TaskMenuComponent', () => {
  let component: TaskMenuComponent
  let fixture: ComponentFixture<TaskMenuComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MatDialogModule,
        MatSnackBarModule,
        NoopAnimationsModule,
        MatMenuModule,
        MatIconModule
      ],
      declarations: [TaskMenuComponent],
      providers: [
        { provide: TaskService, useValue: { getTask() { } }},
        { provide: TeamService, useValue: { removeTask() { } }}
      ]
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskMenuComponent)
    component = fixture.componentInstance
    component.team = team
    component.task = team.tasks[0]
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should open task description dialog', () => {
    const dialog = TestBed.inject(MatDialog)
    spyOn(dialog, 'open').and.callThrough()

    component.taskDescription()

    expect(dialog.open).toHaveBeenCalled()
  })

  it('should open confirmation dialog', () => {
    const dialog = TestBed.inject(MatDialog)
    spyOn(dialog, 'open').and.callThrough()

    component.openDialog()

    expect(dialog.open).toHaveBeenCalled()
  })

  it('should export task', () => {
    const taskService = TestBed.inject(TaskService)
    spyOn(taskService, 'getTask').and.callFake(() => of(tasks[0]))
    spyOn(component, 'saveAsFile').and.callFake(() => { })

    component.export()

    expect(taskService.getTask).toHaveBeenCalled()
    expect(component.saveAsFile).toHaveBeenCalled()
  })

  it('should remove its task', () => {
    const teamService = TestBed.inject(TeamService)
    spyOn(teamService, 'removeTask')

    component.removeItself()

    expect(teamService.removeTask).toHaveBeenCalled()
  })
})
