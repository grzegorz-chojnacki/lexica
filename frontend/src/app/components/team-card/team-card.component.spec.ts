import { ComponentFixture, TestBed } from '@angular/core/testing'
import { MatCardModule } from '@angular/material/card'
import { MatButtonModule } from '@angular/material/button'
import { MatIconModule } from '@angular/material/icon'
import { MatMenuModule } from '@angular/material/menu'

import { TeamCardComponent } from './team-card.component'
import { FullNamePipe } from 'src/app/pipes/full-name.pipe'
import { testTeams } from 'src/app/services/team.service'

describe('TeamCardComponent', () => {
  let component: TeamCardComponent
  let fixture: ComponentFixture<TeamCardComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MatCardModule,
        MatButtonModule,
        MatIconModule,
        MatMenuModule
      ],
      declarations: [
        TeamCardComponent,
        FullNamePipe
      ]
    })
    .compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamCardComponent)
    component = fixture.componentInstance

    component.team = testTeams[0]

    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
