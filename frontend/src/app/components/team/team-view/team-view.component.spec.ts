import { HttpClientTestingModule } from '@angular/common/http/testing'
import { NO_ERRORS_SCHEMA } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { ReactiveFormsModule } from '@angular/forms'
import { MatCardModule } from '@angular/material/card'
import { MatDialogModule } from '@angular/material/dialog'
import { MatTabsModule } from '@angular/material/tabs'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { RouterTestingModule } from '@angular/router/testing'
import { of } from 'rxjs'
import { User } from 'src/app/classes/user'
import { TeamService } from 'src/app/services/team.service'
import { UserService } from 'src/app/services/user.service'
import { otherTeam, team, users } from 'src/app/test-data'

import { TeamViewComponent } from './team-view.component'

describe('TeamComponent', () => {
  let component: TeamViewComponent
  let fixture: ComponentFixture<TeamViewComponent>
  let userService: UserService
  let teamService: TeamService

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([]),
        ReactiveFormsModule,
        BrowserAnimationsModule,
        MatDialogModule,
        MatTabsModule,
        MatCardModule,
      ],
      declarations: [TeamViewComponent],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamViewComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
    userService = TestBed.inject(UserService)
    teamService = TestBed.inject(TeamService)
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should properly set view properties', () => {
    spyOnProperty(userService, 'user').and.returnValue(of(users[3]))
    spyOn(teamService, 'getTeam').and.returnValue(of(team))

    component.ngOnInit()
    expect(component.leaderView).toBeFalse()
    expect(component.hasProgressView).toBeTrue()
  })

  it('should properly set view properties to true', () => {
    spyOnProperty(userService, 'user').and.returnValue(of(users[1]))
    spyOn(teamService, 'getTeam').and.returnValue(of(otherTeam))

    component.ngOnInit()
    expect(component.leaderView).toBeTrue()
    expect(component.hasProgressView).toBeTrue()
  })

  it('should properly set user with progress property', () => {
    spyOnProperty(userService, 'user').and.returnValue(of(users[1]))
    spyOn(teamService, 'getTeam').and.returnValue(of(team))

    component.ngOnInit()
    expect(component.loggedUserWithProgress).toEqual(users[1])
  })

  it('should fallback to empty user when logged is not a member', () => {
    spyOnProperty(userService, 'user').and.returnValue(of(users[0]))
    spyOn(teamService, 'getTeam').and.returnValue(of(team))

    component.ngOnInit()
    expect(component.loggedUserWithProgress).toEqual(User.empty)
  })
})
