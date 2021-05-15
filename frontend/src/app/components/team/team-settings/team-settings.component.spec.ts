import { HttpClientTestingModule } from '@angular/common/http/testing'
import { NO_ERRORS_SCHEMA } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { ReactiveFormsModule } from '@angular/forms'
import { MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog'
import { MatSlideToggleChange, MatSlideToggleModule } from '@angular/material/slide-toggle'
import { MatSnackBarModule } from '@angular/material/snack-bar'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { TeamService } from 'src/app/services/team.service'
import { team } from 'src/app/test-data'

import { TeamSettingsComponent } from './team-settings.component'

describe('TeamSettingsComponent', () => {
  let component: TeamSettingsComponent
  let fixture: ComponentFixture<TeamSettingsComponent>
  let teamService: TeamService

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        MatSnackBarModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,
        MatSlideToggleModule,
        MatDialogModule,
      ],
      declarations: [TeamSettingsComponent],
      providers: [{ provide: MAT_DIALOG_DATA, useValue: team }],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamSettingsComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
    teamService = TestBed.inject(TeamService)
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should toggle leader membership', () => {
    spyOn(teamService, 'joinTeam')
    spyOn(teamService, 'leaveTeam')
    const checked = new MatSlideToggleChange({ } as any, true)
    const unchecked = new MatSlideToggleChange({ } as any, false)

    component.toggleLeaderProgressActivation(checked)
    expect(teamService.joinTeam).toHaveBeenCalled()

    component.toggleLeaderProgressActivation(unchecked)
    expect(teamService.leaveTeam).toHaveBeenCalled()
  })

  it('should update team after submit', () => {
    spyOn(teamService, 'updateTeam')

    component.submit()
    expect(teamService.updateTeam).toHaveBeenCalled()
  })
})
