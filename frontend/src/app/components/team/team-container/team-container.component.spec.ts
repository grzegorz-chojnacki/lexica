import { ComponentFixture, TestBed } from '@angular/core/testing'
import { MatExpansionModule } from '@angular/material/expansion'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { TeamContainerComponent } from './team-container.component'

describe('TeamContainerComponent', () => {
  let component: TeamContainerComponent
  let fixture: ComponentFixture<TeamContainerComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        MatExpansionModule,
      ],
      declarations: [TeamContainerComponent]
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamContainerComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
