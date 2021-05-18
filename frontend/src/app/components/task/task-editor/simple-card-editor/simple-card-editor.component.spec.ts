import { ComponentFixture, TestBed } from '@angular/core/testing'
import { FormGroup, ReactiveFormsModule } from '@angular/forms'
import { MatCardModule } from '@angular/material/card'
import { MatDialogModule } from '@angular/material/dialog'
import { MatIconModule } from '@angular/material/icon'
import { MatListModule } from '@angular/material/list'
import { NoopAnimationsModule } from '@angular/platform-browser/animations'
import { RouterTestingModule } from '@angular/router/testing'
import { SimpleCardEditorComponent } from './simple-card-editor.component'

describe('SimpleCardEditorComponent', () => {
  let component: SimpleCardEditorComponent
  let fixture: ComponentFixture<SimpleCardEditorComponent>

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
      declarations: [SimpleCardEditorComponent],
      providers: [{ provide: FormGroup, useValue: new FormGroup({ }) }]
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(SimpleCardEditorComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
