import { ComponentFixture, TestBed } from '@angular/core/testing'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog'
import { MatInputModule } from '@angular/material/input'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { users } from 'src/app/test-data'

import { FullNameDialogComponent } from './full-name-dialog.component'

describe('FullNameDialogComponent', () => {
  let component: FullNameDialogComponent
  let fixture: ComponentFixture<FullNameDialogComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ReactiveFormsModule,
        MatDialogModule,
        MatInputModule,
        BrowserAnimationsModule,
      ],
      declarations: [FullNameDialogComponent],
      providers: [{ provide: MAT_DIALOG_DATA, useValue: users[0] }]
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(FullNameDialogComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
