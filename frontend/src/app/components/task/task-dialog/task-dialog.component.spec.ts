import { ComponentFixture, TestBed } from '@angular/core/testing'
import { MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog'
import { MatIconModule } from '@angular/material/icon'
import { MatInputModule } from '@angular/material/input'
import { MatRadioModule } from '@angular/material/radio'
import { of } from 'rxjs'
import { DataService } from 'src/app/services/data.service'
import { team } from 'src/app/test-data'
import { TaskDialogComponent } from './task-dialog.component'

fdescribe('TaskDialogComponent', () => {
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
      declarations: [TaskDialogComponent],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: { team, task: team.tasks[0] } },
        {
          provide: DataService, useValue: {
            currentMessage: of(),
            changeMessage() { }
          }
        }
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

  it('should change data service message when foreign version is selected', () => {
    const dataService = TestBed.inject(DataService)
    spyOn(dataService, 'changeMessage')

    component.isForeignVersion(true)

    expect(dataService.changeMessage).toHaveBeenCalledWith('foreignWord')
  })

  it('should change data service message when native version is selected', () => {
    const dataService = TestBed.inject(DataService)
    spyOn(dataService, 'changeMessage')

    component.isForeignVersion(false)

    expect(dataService.changeMessage).toHaveBeenCalledWith('nativeWord')
  })
})
