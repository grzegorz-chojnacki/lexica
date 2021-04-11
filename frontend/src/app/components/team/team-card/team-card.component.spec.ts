import { ComponentFixture, TestBed } from '@angular/core/testing'
import { MatCardModule } from '@angular/material/card'
import { MatButtonModule } from '@angular/material/button'
import { MatIconModule } from '@angular/material/icon'
import { MatMenuModule } from '@angular/material/menu'
import { MatDialogModule } from '@angular/material/dialog'
import { RouterTestingModule } from '@angular/router/testing'
import { MatSnackBarModule } from '@angular/material/snack-bar'
import { HttpClientModule } from '@angular/common/http'

import { TeamCardComponent } from './team-card.component'
import { FullNamePipe } from 'src/app/pipes/full-name.pipe'
import { team } from 'src/app/test-data'

describe('TeamCardComponent', () => {
  let component: TeamCardComponent
  let fixture: ComponentFixture<TeamCardComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MatCardModule,
        MatButtonModule,
        MatIconModule,
        HttpClientModule,
        MatMenuModule,
        MatDialogModule,
        RouterTestingModule.withRoutes([]),
        MatSnackBarModule,
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
    component.team = team
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
