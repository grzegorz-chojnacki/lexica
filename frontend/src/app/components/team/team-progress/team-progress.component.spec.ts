import { ComponentFixture, TestBed } from '@angular/core/testing'
import { MatCardModule } from '@angular/material/card'
import { MatListModule } from '@angular/material/list'
import { Progress } from 'src/app/classes/progress'
import { User } from 'src/app/classes/user'
import { tasks, team } from 'src/app/test-data'
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

  it('should produce average progress for user', () => {
    component.tasks = tasks
    component.user = new User('', '', '', '', '', [
      new Progress(tasks[0],   0),
      new Progress(tasks[1],  50),
    ])

    const avg = component.getAverageProgress()
    expect(avg).toBe(25)
  })

  it('should produce average progress in team', () => {
    component.tasks = tasks
    component.user = new User('', '', '', '', '', [
      new Progress(tasks[0], 30),
    ])

    const avg = component.getTeamProgress()
    expect(avg).toBe(30 / tasks.length)
  })
})
