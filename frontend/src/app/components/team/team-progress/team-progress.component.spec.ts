import { ComponentFixture, TestBed } from '@angular/core/testing'
import { MatCardModule } from '@angular/material/card'
import { MatListModule } from '@angular/material/list'
import { team } from 'src/app/test-data'
import { TeamProgressComponent } from './team-progress.component'

describe('TeamProgressComponent', () => {
  let component: TeamProgressComponent
  let fixture: ComponentFixture<TeamProgressComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MatListModule,
        MatCardModule,
      ],
      declarations: [TeamProgressComponent]
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamProgressComponent)
    component = fixture.componentInstance
    component.tasks = team.tasks,
    component.user = team.users[0]
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
