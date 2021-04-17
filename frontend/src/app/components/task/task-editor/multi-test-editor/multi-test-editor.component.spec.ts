import { ComponentFixture, TestBed } from '@angular/core/testing'
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms'
import { MatCardModule } from '@angular/material/card'
import { MatDialogModule } from '@angular/material/dialog'
import { MatIconModule } from '@angular/material/icon'
import { MatListModule } from '@angular/material/list'
import { RouterTestingModule } from '@angular/router/testing'
import { MultiTestEditorComponent } from './multi-test-editor.component'

describe('MultiTestEditorComponent', () => {
  let component: MultiTestEditorComponent
  let fixture: ComponentFixture<MultiTestEditorComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        RouterTestingModule,
        MatDialogModule,
        MatIconModule,
        MatCardModule,
        MatListModule,
      ],
      declarations: [MultiTestEditorComponent],
      providers: [{ provide: FormGroup, useValue: new FormGroup({}) }]
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(MultiTestEditorComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
