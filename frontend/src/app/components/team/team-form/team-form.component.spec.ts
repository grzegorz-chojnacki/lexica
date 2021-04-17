import { ComponentFixture, TestBed } from '@angular/core/testing'
import { FormBuilder, ReactiveFormsModule } from '@angular/forms'
import { MatInputModule } from '@angular/material/input'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { TeamFormComponent } from './team-form.component'

describe('TeamFormComponent', () => {
  let component: TeamFormComponent
  let fixture: ComponentFixture<TeamFormComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MatInputModule,
        BrowserAnimationsModule,
        ReactiveFormsModule
      ],
      declarations: [TeamFormComponent]
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamFormComponent)
    component = fixture.componentInstance
    component.teamForm = new FormBuilder()
      .group({ name: '', description: '', color: '' })
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
