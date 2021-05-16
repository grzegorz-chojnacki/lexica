import { ComponentFixture, TestBed } from '@angular/core/testing'
import { ReactiveFormsModule } from '@angular/forms'
import { MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog'
import { MatInputModule } from '@angular/material/input'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { users } from 'src/app/test-data'
import { ColorDialogComponent } from './color-dialog.component'

describe('ColorDialogComponent', () => {
  let component: ColorDialogComponent
  let fixture: ComponentFixture<ColorDialogComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        BrowserAnimationsModule,
        MatDialogModule,
        MatInputModule,
      ],
      declarations: [ ColorDialogComponent ],
      providers: [{ provide: MAT_DIALOG_DATA, useValue: users[0] }]
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(ColorDialogComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('make new user instance', () => {
    expect(component.getValue()).not.toBe(users[0])
  })
})
