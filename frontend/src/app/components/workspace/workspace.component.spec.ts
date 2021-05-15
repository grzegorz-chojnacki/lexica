import { NO_ERRORS_SCHEMA } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { FormsModule } from '@angular/forms'
import { MatButtonModule } from '@angular/material/button'
import { MatCardModule } from '@angular/material/card'
import { MatDialog, MatDialogModule } from '@angular/material/dialog'
import { MatDividerModule } from '@angular/material/divider'
import { MatExpansionModule } from '@angular/material/expansion'
import { MatIconModule } from '@angular/material/icon'
import { MatInputModule } from '@angular/material/input'
import { MatMenuModule } from '@angular/material/menu'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { FullNamePipe } from 'src/app/pipes/full-name.pipe'
import { TeamSearchPipe } from 'src/app/pipes/team-search.pipe'
import { TeamService } from 'src/app/services/team.service'
import { UserService } from 'src/app/services/user.service'
import { fakeTeamService, fakeUserService, otherTeam, team } from 'src/app/test-data'
import { WorkspaceComponent } from './workspace.component'

describe('WorkspaceComponent', () => {
  let component: WorkspaceComponent
  let fixture: ComponentFixture<WorkspaceComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        FormsModule,
        MatButtonModule,
        MatExpansionModule,
        MatDividerModule,
        MatIconModule,
        MatInputModule,
        MatDialogModule,
        MatCardModule,
        MatMenuModule,
      ],
      declarations: [
        WorkspaceComponent,
        FullNamePipe,
        TeamSearchPipe
      ],
      providers: [
        { provide: TeamService, useValue: fakeTeamService() },
        { provide: UserService, useValue: fakeUserService() }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkspaceComponent)
    component = fixture.componentInstance
    TestBed.inject(UserService).login('', '')
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should split teams to user[0] team and other teams', () => {
    component.ngOnInit()
    expect(component.ownedTeams).toEqual([team])
    expect(component.otherTeams).toEqual([otherTeam])
  })

  it('should open dialog', () => {
    const dialog = TestBed.inject(MatDialog)
    spyOn(dialog, 'open')
    component.openDialog()
    expect(dialog.open).toHaveBeenCalled()
  })
})
