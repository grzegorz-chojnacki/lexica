import { ComponentFixture, TestBed } from '@angular/core/testing'

import { TeamCardComponent } from './team-card.component'
import { TeamLeaderOverlinePipe } from 'src/app/pipes/team-leader-overline.pipe'
import { testTeam } from 'src/app/services/team.service'

describe('TeamCardComponent', () => {
  let component: TeamCardComponent
  let fixture: ComponentFixture<TeamCardComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        TeamCardComponent,
        TeamLeaderOverlinePipe
      ]
    })
    .compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamCardComponent)
    component = fixture.componentInstance

    component.team = testTeam

    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
