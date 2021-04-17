import { ComponentFixture, TestBed } from '@angular/core/testing'
import { FormsModule } from '@angular/forms'
import { MatCardModule } from '@angular/material/card'
import { MatCheckboxModule } from '@angular/material/checkbox'
import { MatDialogModule } from '@angular/material/dialog'
import { multiTestTask } from 'src/app/test-data'
import { MultiTestViewComponent } from './multi-test-view.component'

describe('MultiChoiceTestViewComponent', () => {
  let component: MultiTestViewComponent
  let fixture: ComponentFixture<MultiTestViewComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MatDialogModule,
        MatCheckboxModule,
        FormsModule,
        MatCardModule,
      ],
      declarations: [MultiTestViewComponent]
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(MultiTestViewComponent)
    component = fixture.componentInstance
    component.task = multiTestTask
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
