import { ComponentFixture, TestBed } from '@angular/core/testing'
import { MatCardModule } from '@angular/material/card'
import { MatButtonModule } from '@angular/material/button'
import { MatIconModule } from '@angular/material/icon'
import { MatMenuModule } from '@angular/material/menu'
import { MatDialog, MatDialogModule } from '@angular/material/dialog'
import { RouterTestingModule } from '@angular/router/testing'
import { MatSnackBarModule } from '@angular/material/snack-bar'
import { TeamCardComponent } from './team-card.component'
import { FullNamePipe } from 'src/app/pipes/full-name.pipe'
import { team } from 'src/app/test-data'
import { TeamService } from 'src/app/services/team.service'
import { NoopAnimationsModule } from '@angular/platform-browser/animations'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

describe('TeamCardComponent', () => {
  let component: TeamCardComponent
  let fixture: ComponentFixture<TeamCardComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MatCardModule,
        MatButtonModule,
        NoopAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        MatIconModule,
        MatMenuModule,
        MatDialogModule,
        RouterTestingModule.withRoutes([]),
        MatSnackBarModule,
      ],
      declarations: [ TeamCardComponent, FullNamePipe ],
      providers: [{
        provide: TeamService,
        useValue: { leaveTeam() { }, remove() { }}
      }]
    })
    .compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamCardComponent)
    component = fixture.componentInstance
    component.team = team
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should open team settings dialog', () => {
    const dialog = TestBed.inject(MatDialog)
    spyOn(dialog, 'open').and.callThrough()

    component.teamSettings()

    expect(dialog.open).toHaveBeenCalled()
  })

  it('should open leave team dialog', () => {
    const dialog = TestBed.inject(MatDialog)
    spyOn(dialog, 'open').and.callThrough()

    component.openLeaveDialog()

    expect(dialog.open).toHaveBeenCalled()
  })

  it('should open delete team dialog', () => {
    const dialog = TestBed.inject(MatDialog)
    spyOn(dialog, 'open').and.callThrough()

    component.openDeleteDialog()

    expect(dialog.open).toHaveBeenCalled()
  })

  it('should copy team code to clipboard when available', () => {
    spyOn(navigator.clipboard, 'writeText').and.callFake(() => Promise.resolve())
    component.copyToClipboard()

    expect(navigator.clipboard.writeText)
      .toHaveBeenCalledWith(component.team.id)
  })
})
