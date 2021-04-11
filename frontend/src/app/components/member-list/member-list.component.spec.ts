import { HttpClientModule } from '@angular/common/http'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { MatDialogModule } from '@angular/material/dialog'
import { MatDividerModule } from '@angular/material/divider'
import { MatIconModule } from '@angular/material/icon'
import { MatListModule } from '@angular/material/list'
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'
import { MatSnackBarModule } from '@angular/material/snack-bar'
import { FullNamePipe } from 'src/app/pipes/full-name.pipe'
import { SortMembersPipe } from 'src/app/pipes/sort-members.pipe'
import { team } from 'src/app/test-data'
import { MemberListComponent } from './member-list.component'

describe('MemberListComponent', () => {
  let component: MemberListComponent
  let fixture: ComponentFixture<MemberListComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MatDialogModule,
        MatSnackBarModule,
        HttpClientModule,
        MatProgressSpinnerModule,
        MatDividerModule,
        MatIconModule,
        MatListModule
      ],
      declarations: [
        MemberListComponent,
        SortMembersPipe,
        FullNamePipe
      ],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(MemberListComponent)
    component = fixture.componentInstance
    component.team = team
    component.task = team.tasks[0]
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
