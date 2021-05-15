import { HttpClientTestingModule } from '@angular/common/http/testing'
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
        HttpClientTestingModule,
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
          useValue: { snapshot: { paramMap: convertToParamMap({ }) } }
        }
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
})
