import { ComponentFixture, TestBed } from '@angular/core/testing'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { MatExpansionModule } from '@angular/material/expansion'

import { TeamContainerComponent } from './team-container.component'
import { TeamCardComponent } from 'src/app/components/team/team-card/team-card.component'

describe('TeamContainerComponent', () => {
  let component: TeamContainerComponent
  let fixture: ComponentFixture<TeamContainerComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        MatExpansionModule,
      ],
      declarations: [
        TeamContainerComponent,
        TeamCardComponent,
      ]
    })
    .compileComponents()
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
