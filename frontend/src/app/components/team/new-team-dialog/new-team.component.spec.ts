import { HttpClientTestingModule } from '@angular/common/http/testing'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { ReactiveFormsModule } from '@angular/forms'
import { MatDialogModule } from '@angular/material/dialog'
import { MatInputModule } from '@angular/material/input'
import { MatSnackBarModule } from '@angular/material/snack-bar'
import { MatTabsModule } from '@angular/material/tabs'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { NewTeamComponent } from './new-team.component'

describe('NewTeamComponent', () => {
  let component: NewTeamComponent
  let fixture: ComponentFixture<NewTeamComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MatSnackBarModule,
        ReactiveFormsModule,
        HttpClientTestingModule,
        MatDialogModule,
        MatTabsModule,
        BrowserAnimationsModule,
        MatInputModule
      ],
      declarations: [NewTeamComponent]
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(NewTeamComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
