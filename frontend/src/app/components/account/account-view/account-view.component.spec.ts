import { HttpClientTestingModule } from '@angular/common/http/testing'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { MatCardModule } from '@angular/material/card'
import { MatDialogModule } from '@angular/material/dialog'
import { MatListModule } from '@angular/material/list'
import { MatSnackBarModule } from '@angular/material/snack-bar'
import { RouterTestingModule } from '@angular/router/testing'
import { FullNamePipe } from 'src/app/pipes/full-name.pipe'
import { AccountViewComponent } from './account-view.component'

describe('AccountViewComponent', () => {
  let component: AccountViewComponent
  let fixture: ComponentFixture<AccountViewComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MatSnackBarModule,
        RouterTestingModule,
        HttpClientTestingModule,
        MatDialogModule,
        MatListModule,
        MatCardModule,
      ],
      declarations: [AccountViewComponent, FullNamePipe]
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountViewComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
