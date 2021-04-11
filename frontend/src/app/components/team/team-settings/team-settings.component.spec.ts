import { HttpClientModule } from '@angular/common/http'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { ReactiveFormsModule } from '@angular/forms'
import { MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog'
import { MatSlideToggleModule } from '@angular/material/slide-toggle'
import { MatSnackBarModule } from '@angular/material/snack-bar'
import { team } from 'src/app/test-data'

import { TeamSettingsComponent } from './team-settings.component'

describe('TeamSettingsComponent', () => {
  let component: TeamSettingsComponent
  let fixture: ComponentFixture<TeamSettingsComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        MatSnackBarModule,
        ReactiveFormsModule,
        MatSlideToggleModule,
        MatDialogModule,
      ],
      declarations: [TeamSettingsComponent],
      providers: [{ provide: MAT_DIALOG_DATA, useValue: team }]
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamSettingsComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
