import { ComponentFixture, TestBed } from '@angular/core/testing'
import { FormGroup, ReactiveFormsModule } from '@angular/forms'
import { MatCardModule } from '@angular/material/card'
import { MatDialog, MatDialogModule } from '@angular/material/dialog'
import { MatIconModule } from '@angular/material/icon'
import { MatListModule } from '@angular/material/list'
import { NoopAnimationsModule } from '@angular/platform-browser/animations'
import { RouterTestingModule } from '@angular/router/testing'
import { simpleCardTask } from 'src/app/test-data'
import { SimpleCardEditorComponent } from './simple-card-editor/simple-card-editor.component'

describe('SimpleCardEditorComponent', () => {
  let component: SimpleCardEditorComponent
  let fixture: ComponentFixture<SimpleCardEditorComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        RouterTestingModule,
        NoopAnimationsModule,
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

  it('should open add dialog ', () => {
    const dialog = TestBed.inject(MatDialog)
    spyOn(dialog, 'open').and.callThrough()

    component.addCard()

    expect(dialog.open).toHaveBeenCalled()
  })

  it('should open edit dialog ', () => {
    const dialog = TestBed.inject(MatDialog)
    spyOn(dialog, 'open').and.callThrough()

    component.editCard(simpleCardTask.examples[0])

    expect(dialog.open).toHaveBeenCalled()
  })

  it('should emit truthy submit event', async () => {
    component.onSubmit.subscribe(e => expect(e).toBeTruthy())
    component.submit()
  })

  it('should emit false cancel event', async () => {
    component.onSubmit.subscribe(e => expect(e).toBeFalse())
    component.cancel()
  })
})
