import { ComponentFixture, TestBed } from '@angular/core/testing'
import { ReactiveFormsModule } from '@angular/forms'
import { MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog'
import { MatInputModule } from '@angular/material/input'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { users } from 'src/app/test-data'
import { PasswordDialogComponent } from './password-dialog.component'

describe('PasswordDialogComponent', () => {
  let component: PasswordDialogComponent
  let fixture: ComponentFixture<PasswordDialogComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        MatDialogModule,
        MatInputModule,
        BrowserAnimationsModule
      ],
      declarations: [PasswordDialogComponent],
      providers: [{ provide: MAT_DIALOG_DATA, useValue: users[0] }]
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(PasswordDialogComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
