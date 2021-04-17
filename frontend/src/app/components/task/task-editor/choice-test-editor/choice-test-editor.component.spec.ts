import { ComponentFixture, TestBed } from '@angular/core/testing'
import { FormGroup, ReactiveFormsModule } from '@angular/forms'
import { MatCardModule } from '@angular/material/card'
import { MatDialogModule } from '@angular/material/dialog'
import { MatIconModule } from '@angular/material/icon'
import { MatListModule } from '@angular/material/list'
import { RouterTestingModule } from '@angular/router/testing'
import { ChoiceTestEditorComponent } from './choice-test-editor.component'

describe('ChoiceTestEditorComponent', () => {
  let component: ChoiceTestEditorComponent
  let fixture: ComponentFixture<ChoiceTestEditorComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        MatDialogModule,
        MatIconModule,
        MatListModule,
        MatCardModule,
        ReactiveFormsModule
      ],
      declarations: [ChoiceTestEditorComponent],
      providers: [{ provide: FormGroup, useValue: new FormGroup({}) }]
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(ChoiceTestEditorComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
