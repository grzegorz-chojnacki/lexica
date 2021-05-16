import { ComponentFixture, TestBed } from '@angular/core/testing'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog'
import { MatIconModule } from '@angular/material/icon'
import { MatInputModule } from '@angular/material/input'
import { MatRadioModule } from '@angular/material/radio'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { simpleCardTask } from 'src/app/test-data'
import { SimpleCardDialogComponent } from './simple-card-dialog.component'

describe('SimpleCardDialogComponent', () => {
  let component: SimpleCardDialogComponent
  let fixture: ComponentFixture<SimpleCardDialogComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MatIconModule,
        MatRadioModule,
        MatDialogModule,
        FormsModule,
        ReactiveFormsModule,
        MatInputModule,
        BrowserAnimationsModule,
      ],
      declarations: [SimpleCardDialogComponent],
      providers: [{ provide: MAT_DIALOG_DATA, useValue: simpleCardTask.examples[0] }]
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(SimpleCardDialogComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
