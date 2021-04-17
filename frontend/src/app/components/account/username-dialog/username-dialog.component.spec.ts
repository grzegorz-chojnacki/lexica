import { ComponentFixture, TestBed } from '@angular/core/testing'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog'
import { MatInputModule } from '@angular/material/input'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { users } from 'src/app/test-data'

import { UsernameDialogComponent } from './username-dialog.component'

describe('UsernameDialogComponent', () => {
  let component: UsernameDialogComponent
  let fixture: ComponentFixture<UsernameDialogComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        FormsModule,
        MatInputModule,
        BrowserAnimationsModule,
        MatDialogModule
      ],
      declarations: [UsernameDialogComponent],
      providers: [{ provide: MAT_DIALOG_DATA, useValue: users[0] }]
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(UsernameDialogComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
