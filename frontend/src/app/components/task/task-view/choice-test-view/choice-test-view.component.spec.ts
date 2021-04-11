import { ComponentFixture, TestBed } from '@angular/core/testing'
import { FormsModule } from '@angular/forms'
import { MatCardModule } from '@angular/material/card'
import { MatDialogModule } from '@angular/material/dialog'
import { MatRadioModule } from '@angular/material/radio'
import { choiceTestTask } from 'src/app/test-data'
import { ChoiceTestViewComponent } from './choice-test-view.component'


describe('ChoiceTestViewComponent', () => {
  let component: ChoiceTestViewComponent
  let fixture: ComponentFixture<ChoiceTestViewComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MatDialogModule,
        MatCardModule,
        MatRadioModule,
        FormsModule
      ],
      declarations: [ ChoiceTestViewComponent ]
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(ChoiceTestViewComponent)
    component = fixture.componentInstance
    component.task = choiceTestTask
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
