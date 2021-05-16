import { ComponentFixture, TestBed } from '@angular/core/testing'
import { ReactiveFormsModule } from '@angular/forms'
import { MatCardModule } from '@angular/material/card'
import { MatDialogModule } from '@angular/material/dialog'
import { MatIconModule } from '@angular/material/icon'
import { MatInputModule } from '@angular/material/input'
import { MatListModule } from '@angular/material/list'
import { MatSelectModule } from '@angular/material/select'
import { MatSnackBarModule } from '@angular/material/snack-bar'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { ActivatedRoute, convertToParamMap } from '@angular/router'
import { RouterTestingModule } from '@angular/router/testing'
import { of } from 'rxjs'
import { TaskService } from 'src/app/services/task.service'
import { tasks } from 'src/app/test-data'
import { TaskDirective } from '../../task-view/task-view-dispatch/task-view-dispatch.component'
import { ChoiceTestEditorComponent } from '../choice-test-editor/choice-test-editor.component'
import { MultiTestEditorComponent } from '../multi-test-editor/multi-test-editor.component'
import { SimpleCardEditorComponent } from '../simple-card-editor/simple-card-editor.component'
import { TaskEditorDispatchComponent } from './task-editor-dispatch.component'

describe('EditorViewComponent', () => {
  let component: TaskEditorDispatchComponent
  let fixture: ComponentFixture<TaskEditorDispatchComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MatSnackBarModule,
        ReactiveFormsModule,
        RouterTestingModule,
        MatCardModule,
        MatInputModule,
        BrowserAnimationsModule,
        MatDialogModule,
        MatSelectModule,
        MatListModule,
        MatIconModule
      ],
      declarations: [
        TaskEditorDispatchComponent,
        TaskDirective,
        SimpleCardEditorComponent,
        ChoiceTestEditorComponent,
        MultiTestEditorComponent,
      ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { snapshot: { paramMap: convertToParamMap({ teamId: 1, taskId: 2 }) } }
        },
        {
          provide: TaskService,
          useValue: {
            getTask() { return of(tasks[0]) },
            updateTask() { },
            createTask() { },
        }}
      ]
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskEditorDispatchComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should export task', () => {
    spyOn(component, 'saveAsFile').and.callFake(() => { })
    component.export()
    expect(component.saveAsFile).toHaveBeenCalled()
  })
})
