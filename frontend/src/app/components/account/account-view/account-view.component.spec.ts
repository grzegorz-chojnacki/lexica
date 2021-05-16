import { ComponentFixture, TestBed } from '@angular/core/testing'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { MatCardModule } from '@angular/material/card'
import { MatDialog, MatDialogModule } from '@angular/material/dialog'
import { MatListModule } from '@angular/material/list'
import { MatSnackBarModule } from '@angular/material/snack-bar'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { Router } from '@angular/router'
import { RouterTestingModule } from '@angular/router/testing'
import { FullNamePipe } from 'src/app/pipes/full-name.pipe'
import { UserService } from 'src/app/services/user.service'
import { fakeUserService } from 'src/app/test-data'
import { AccountViewComponent } from './account-view.component'

describe('AccountViewComponent', () => {
  let component: AccountViewComponent
  let fixture: ComponentFixture<AccountViewComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MatSnackBarModule,
        RouterTestingModule,
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        MatDialogModule,
        MatListModule,
        MatCardModule,
      ],
      declarations: [AccountViewComponent, FullNamePipe],
      providers: [{ provide: UserService, useValue: fakeUserService() }]
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

  const checkDialog = (dialogTest: () => void): void => {
    const dialog = TestBed.inject(MatDialog)
    spyOn(dialog, 'open').and.callThrough()

    dialogTest()

    expect(dialog.open).toHaveBeenCalled()
  }

  it('should spawn full name dialog', () => {
    checkDialog(() => component.changeFullName())
  })

  it('should spawn username dialog', () => {
    checkDialog(() => component.changeUsername())
  })

  it('should spawn password dialog', () => {
    checkDialog(() => component.changePassword())
  })

  it('should spawn color dialog', () => {
    checkDialog(() => component.changeColor())
  })

  it('should remove account', () => {
    const userService = TestBed.inject(UserService)
    spyOn(userService, 'removeAccount').and.callThrough()
    const router = TestBed.inject(Router)
    spyOn(router, 'navigate').and.callThrough()

    component.removeAccount()

    expect(userService.removeAccount).toHaveBeenCalled()
    expect(router.navigate).toHaveBeenCalled()
  })
})
