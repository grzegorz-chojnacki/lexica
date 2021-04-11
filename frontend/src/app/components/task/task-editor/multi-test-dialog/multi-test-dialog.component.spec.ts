import { ComponentFixture, TestBed } from '@angular/core/testing'
import { FormsModule } from '@angular/forms'
import { MatCheckboxModule } from '@angular/material/checkbox'
import { MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog'
import { MatIconModule } from '@angular/material/icon'
import { MatInputModule } from '@angular/material/input'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { multiTestTask } from 'src/app/test-data'
import { MultiTestDialogComponent } from './multi-test-dialog.component'


describe('MultiTestDialogComponent', () => {
  let component: MultiTestDialogComponent
  let fixture: ComponentFixture<MultiTestDialogComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MatIconModule,
        MatCheckboxModule,
        MatDialogModule,
        FormsModule,
        MatInputModule,
        BrowserAnimationsModule,
      ],
      declarations: [MultiTestDialogComponent],
      providers: [{ provide: MAT_DIALOG_DATA, useValue: multiTestTask.examples[0] }]
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(MultiTestDialogComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
